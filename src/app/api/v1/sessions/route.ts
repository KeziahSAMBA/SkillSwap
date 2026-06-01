import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SessionType } from "@/generated/prisma/client";

const VALID_TYPES = Object.values(SessionType);

// GET /api/v1/sessions?type=WORKSHOP|QUICK_COURSE|CLUB&status=PLANNED
export async function GET(req: NextRequest) {
  const { error } = await getAuthUser(req);
  if (error) return error;

  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type") as SessionType | null;
  const status = searchParams.get("status") ?? undefined;

  if (type && !VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `type doit être l'une des valeurs : ${VALID_TYPES.join(", ")}.` },
      { status: 400 }
    );
  }

  const sessions = await prisma.session.findMany({
    where: {
      ...(type && { type }),
      ...(status && { status: status as never }),
    },
    include: {
      skill: { select: { id: true, name: true, category: true } },
      participants: {
        include: {
          user: { select: { id: true, name: true, photoUrl: true } },
        },
      },
    },
    orderBy: { scheduledAt: "asc" },
  });

  return NextResponse.json({ sessions });
}

// POST /api/v1/sessions
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { title, type, skillId, scheduledAt, durationMin } = body;

  if (!title || !type || !scheduledAt || !durationMin) {
    return NextResponse.json(
      { error: "Les champs title, type, scheduledAt et durationMin sont requis." },
      { status: 400 }
    );
  }

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `type doit être l'une des valeurs : ${VALID_TYPES.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!Number.isInteger(durationMin) || durationMin <= 0) {
    return NextResponse.json(
      { error: "durationMin doit être un entier positif." },
      { status: 400 }
    );
  }

  const scheduledDate = new Date(scheduledAt);
  if (isNaN(scheduledDate.getTime())) {
    return NextResponse.json(
      { error: "scheduledAt doit être une date ISO valide." },
      { status: 400 }
    );
  }

  if (skillId) {
    const skillExists = await prisma.skill.findUnique({ where: { id: skillId } });
    if (!skillExists) {
      return NextResponse.json({ error: "Compétence introuvable." }, { status: 404 });
    }
  }

  const session = await prisma.session.create({
    data: {
      title,
      type,
      skillId: skillId ?? null,
      scheduledAt: scheduledDate,
      durationMin,
      participants: {
        create: { userId: user.id },
      },
    },
    include: {
      skill: { select: { id: true, name: true, category: true } },
      participants: {
        include: {
          user: { select: { id: true, name: true, photoUrl: true } },
        },
      },
    },
  });

  return NextResponse.json({ session }, { status: 201 });
}

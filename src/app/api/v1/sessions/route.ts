import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

function getUserIdFromToken(req: NextRequest): string | null {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as {
      userId: string;
    };
    return payload.userId;
  } catch {
    return null;
  }
}

const TYPE_MAP: Record<string, string> = {
  Atelier: "WORKSHOP",
  "Cours collectif": "QUICK_COURSE",
  Club: "CLUB",
};

export async function GET() {
  const sessions = await prisma.session.findMany({
    orderBy: { scheduledAt: "asc" },
    include: {
      skill: { select: { name: true, category: true } },
      participants: { select: { userId: true } },
    },
  });

  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const { title, type, scheduledAt, skillId, customSkill } = await req.json();

  if (!title || !type || !scheduledAt || (!skillId && !customSkill)) {
    return NextResponse.json(
      { message: "Champs manquants : title, type, scheduledAt, et skillId ou customSkill." },
      { status: 400 }
    );
  }

  const sessionType = TYPE_MAP[type] ?? type;
  const validTypes = ["WORKSHOP", "QUICK_COURSE", "CLUB"];
  if (!validTypes.includes(sessionType)) {
    return NextResponse.json(
      { message: `Type invalide. Valeurs acceptées : ${validTypes.join(", ")}` },
      { status: 400 }
    );
  }

  let resolvedSkillId = skillId;

  if (!skillId && customSkill) {
    const name = customSkill.trim();
    const existing = await prisma.skill.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
    if (existing) {
      resolvedSkillId = existing.id;
    } else {
      const created = await prisma.skill.create({ data: { name } });
      resolvedSkillId = created.id;
    }
  } else {
    const skill = await prisma.skill.findUnique({ where: { id: skillId } });
    if (!skill) {
      return NextResponse.json({ message: "Compétence introuvable." }, { status: 404 });
    }
  }

  const session = await prisma.session.create({
    data: {
      title,
      type: sessionType as "WORKSHOP" | "QUICK_COURSE" | "CLUB",
      scheduledAt: new Date(scheduledAt),
      skillId: resolvedSkillId,
      participants: {
        create: { userId },
      },
    },
    include: {
      skill: { select: { name: true, category: true } },
      participants: { select: { userId: true } },
    },
  });

  return NextResponse.json(session, { status: 201 });
}

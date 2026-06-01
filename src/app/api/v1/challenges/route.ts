import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const participantSelect = {
  select: { id: true, name: true, photoUrl: true },
} as const;

// GET /api/v1/challenges  — mes défis (envoyés + reçus)
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const challenges = await prisma.challenge.findMany({
    where: {
      OR: [{ challengerId: user.id }, { challengedId: user.id }],
    },
    include: {
      challenger: participantSelect,
      challenged: participantSelect,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ challenges });
}

// POST /api/v1/challenges  — lancer un défi
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { challengedId, description } = body;

  if (!challengedId || !description) {
    return NextResponse.json(
      { error: "Les champs challengedId et description sont requis." },
      { status: 400 }
    );
  }

  if (challengedId === user.id) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas vous lancer un défi à vous-même." },
      { status: 400 }
    );
  }

  const target = await prisma.user.findUnique({ where: { id: challengedId } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  const challenge = await prisma.challenge.create({
    data: { challengerId: user.id, challengedId, description },
    include: {
      challenger: participantSelect,
      challenged: participantSelect,
    },
  });

  return NextResponse.json({ challenge }, { status: 201 });
}

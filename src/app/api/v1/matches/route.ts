import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/matches  — liste mes mises en relation (envoyées + reçues)
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const matches = await prisma.match.findMany({
    where: {
      OR: [{ seekerId: user.id }, { helperId: user.id }],
    },
    include: {
      seeker: { select: { id: true, name: true, photoUrl: true } },
      helper: { select: { id: true, name: true, photoUrl: true } },
      skill: { select: { id: true, name: true, category: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ matches });
}

// POST /api/v1/matches  — envoyer une demande de mise en relation
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { helperId, skillId } = body;

  if (!helperId || !skillId) {
    return NextResponse.json(
      { error: "Les champs helperId et skillId sont requis." },
      { status: 400 }
    );
  }

  if (helperId === user.id) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas vous envoyer une demande à vous-même." },
      { status: 400 }
    );
  }

  const [helperExists, skillExists] = await Promise.all([
    prisma.user.findUnique({ where: { id: helperId } }),
    prisma.skill.findUnique({ where: { id: skillId } }),
  ]);

  if (!helperExists) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }
  if (!skillExists) {
    return NextResponse.json({ error: "Compétence introuvable." }, { status: 404 });
  }

  const existing = await prisma.match.findFirst({
    where: { seekerId: user.id, helperId, skillId, status: "PENDING" },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Une demande est déjà en attente pour cette compétence." },
      { status: 409 }
    );
  }

  const match = await prisma.match.create({
    data: { seekerId: user.id, helperId, skillId },
    include: {
      seeker: { select: { id: true, name: true, photoUrl: true } },
      helper: { select: { id: true, name: true, photoUrl: true } },
      skill: { select: { id: true, name: true, category: true } },
    },
  });

  return NextResponse.json({ match }, { status: 201 });
}

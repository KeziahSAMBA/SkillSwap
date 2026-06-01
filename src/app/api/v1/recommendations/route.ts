import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/recommendations  — recommandations reçues par l'utilisateur courant
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const recommendations = await prisma.recommendation.findMany({
    where: { recommendedId: user.id },
    include: {
      recommender: { select: { id: true, name: true, photoUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ recommendations });
}

// POST /api/v1/recommendations
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { recommendedId, content } = body;

  if (!recommendedId || !content) {
    return NextResponse.json(
      { error: "Les champs recommendedId et content sont requis." },
      { status: 400 }
    );
  }

  if (recommendedId === user.id) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas vous recommander vous-même." },
      { status: 400 }
    );
  }

  const target = await prisma.user.findUnique({ where: { id: recommendedId } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  const recommendation = await prisma.recommendation.create({
    data: { recommenderId: user.id, recommendedId, content },
    include: {
      recommender: { select: { id: true, name: true, photoUrl: true } },
      recommended: { select: { id: true, name: true, photoUrl: true } },
    },
  });

  return NextResponse.json({ recommendation }, { status: 201 });
}

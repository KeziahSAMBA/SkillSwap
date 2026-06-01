import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/feedbacks  — feedbacks reçus par l'utilisateur courant
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const feedbacks = await prisma.feedback.findMany({
    where: { receiverId: user.id },
    include: {
      giver: { select: { id: true, name: true, photoUrl: true } },
      session: { select: { id: true, title: true, type: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ feedbacks });
}

// POST /api/v1/feedbacks
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { receiverId, sessionId, rating, comment } = body;

  if (!receiverId || rating === undefined) {
    return NextResponse.json(
      { error: "Les champs receiverId et rating sont requis." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "rating doit être un entier entre 1 et 5." },
      { status: 400 }
    );
  }

  if (receiverId === user.id) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas vous laisser un feedback à vous-même." },
      { status: 400 }
    );
  }

  const target = await prisma.user.findUnique({ where: { id: receiverId } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  if (sessionId) {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) {
      return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
    }
  }

  const feedback = await prisma.feedback.create({
    data: {
      giverId: user.id,
      receiverId,
      sessionId: sessionId ?? null,
      rating,
      comment: comment ?? null,
    },
    include: {
      giver: { select: { id: true, name: true, photoUrl: true } },
      receiver: { select: { id: true, name: true, photoUrl: true } },
      session: { select: { id: true, title: true, type: true } },
    },
  });

  return NextResponse.json({ feedback }, { status: 201 });
}

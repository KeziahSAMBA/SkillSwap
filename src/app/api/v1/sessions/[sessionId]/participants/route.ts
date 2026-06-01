import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/v1/sessions/[sessionId]/participants  — rejoindre une session
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { sessionId } = await params;

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session) {
    return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
  }

  if (session.status !== "PLANNED") {
    return NextResponse.json(
      { error: "Impossible de rejoindre une session qui n'est plus planifiée." },
      { status: 400 }
    );
  }

  const alreadyIn = await prisma.sessionParticipant.findUnique({
    where: { sessionId_userId: { sessionId, userId: user.id } },
  });
  if (alreadyIn) {
    return NextResponse.json(
      { error: "Vous participez déjà à cette session." },
      { status: 409 }
    );
  }

  await prisma.sessionParticipant.create({
    data: { sessionId, userId: user.id },
  });

  return NextResponse.json({ message: "Vous avez rejoint la session." }, { status: 201 });
}

// DELETE /api/v1/sessions/[sessionId]/participants  — quitter une session
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { sessionId } = await params;

  const participant = await prisma.sessionParticipant.findUnique({
    where: { sessionId_userId: { sessionId, userId: user.id } },
  });

  if (!participant) {
    return NextResponse.json(
      { error: "Vous ne participez pas à cette session." },
      { status: 404 }
    );
  }

  await prisma.sessionParticipant.delete({
    where: { sessionId_userId: { sessionId, userId: user.id } },
  });

  return new NextResponse(null, { status: 204 });
}

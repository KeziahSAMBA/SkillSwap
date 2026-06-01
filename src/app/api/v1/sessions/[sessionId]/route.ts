import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SessionStatus, SessionType } from "@/generated/prisma/client";

const sessionInclude = {
  skill: { select: { id: true, name: true, category: true } },
  participants: {
    include: {
      user: { select: { id: true, name: true, photoUrl: true } },
    },
  },
} as const;

async function findSession(sessionId: string) {
  return prisma.session.findUnique({ where: { id: sessionId }, include: sessionInclude });
}

// GET /api/v1/sessions/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { error } = await getAuthUser(req);
  if (error) return error;

  const { sessionId } = await params;
  const session = await findSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
  }

  return NextResponse.json({ session });
}

// PATCH /api/v1/sessions/[sessionId]  — seul un participant peut modifier
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { sessionId } = await params;
  const session = await findSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
  }

  const isParticipant = session.participants.some((p) => p.userId === user.id);
  if (!isParticipant) {
    return NextResponse.json(
      { error: "Seul un participant peut modifier la session." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, type, status, skillId, scheduledAt, durationMin } = body;

  if (type && !Object.values(SessionType).includes(type)) {
    return NextResponse.json({ error: "Type de session invalide." }, { status: 400 });
  }
  if (status && !Object.values(SessionStatus).includes(status)) {
    return NextResponse.json({ error: "Statut de session invalide." }, { status: 400 });
  }

  const updated = await prisma.session.update({
    where: { id: sessionId },
    data: {
      ...(title && { title }),
      ...(type && { type }),
      ...(status && { status }),
      ...(skillId !== undefined && { skillId }),
      ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
      ...(durationMin && { durationMin }),
    },
    include: sessionInclude,
  });

  return NextResponse.json({ session: updated });
}

// DELETE /api/v1/sessions/[sessionId]  — seul un participant peut supprimer
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { sessionId } = await params;
  const session = await findSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
  }

  const isParticipant = session.participants.some((p) => p.userId === user.id);
  if (!isParticipant) {
    return NextResponse.json(
      { error: "Seul un participant peut supprimer la session." },
      { status: 403 }
    );
  }

  await prisma.session.delete({ where: { id: sessionId } });

  return new NextResponse(null, { status: 204 });
}

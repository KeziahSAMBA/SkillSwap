import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChallengeStatus } from "@/generated/prisma/client";

const VALID_TRANSITIONS: Partial<Record<ChallengeStatus, ChallengeStatus[]>> = {
  OPEN: [ChallengeStatus.ACCEPTED, ChallengeStatus.DECLINED],
  ACCEPTED: [ChallengeStatus.COMPLETED],
};

// PATCH /api/v1/challenges/[challengeId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { challengeId } = await params;
  const body = await req.json();
  const { status } = body as { status: ChallengeStatus };

  const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) {
    return NextResponse.json({ error: "Défi introuvable." }, { status: 404 });
  }

  const isInvolved =
    challenge.challengerId === user.id || challenge.challengedId === user.id;
  if (!isInvolved) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  // Seul le destinataire peut accepter/refuser ; les deux peuvent marquer comme complété
  const respondStatuses: ChallengeStatus[] = [ChallengeStatus.ACCEPTED, ChallengeStatus.DECLINED];
  if (respondStatuses.includes(status) && challenge.challengedId !== user.id) {
    return NextResponse.json(
      { error: "Seul le destinataire peut accepter ou refuser ce défi." },
      { status: 403 }
    );
  }

  const allowed = VALID_TRANSITIONS[challenge.status] ?? [];
  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: `Transition invalide depuis le statut ${challenge.status}.` },
      { status: 400 }
    );
  }

  const updated = await prisma.challenge.update({
    where: { id: challengeId },
    data: { status },
    include: {
      challenger: { select: { id: true, name: true, photoUrl: true } },
      challenged: { select: { id: true, name: true, photoUrl: true } },
    },
  });

  return NextResponse.json({ challenge: updated });
}

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MatchStatus } from "@/generated/prisma/client";

const VALID_TRANSITIONS: Record<string, MatchStatus[]> = {
  PENDING: [MatchStatus.ACCEPTED, MatchStatus.DECLINED],
};

// PATCH /api/v1/matches/[matchId]  — accepter ou refuser une demande
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { matchId } = await params;
  const body = await req.json();
  const { status } = body as { status: MatchStatus };

  const match = await prisma.match.findUnique({ where: { id: matchId } });

  if (!match) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  if (match.helperId !== user.id) {
    return NextResponse.json(
      { error: "Seul le destinataire peut répondre à cette demande." },
      { status: 403 }
    );
  }

  const allowed = VALID_TRANSITIONS[match.status] ?? [];
  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: `Transition invalide depuis le statut ${match.status}.` },
      { status: 400 }
    );
  }

  const updated = await prisma.match.update({
    where: { id: matchId },
    data: { status },
    include: {
      seeker: { select: { id: true, name: true, photoUrl: true } },
      helper: { select: { id: true, name: true, photoUrl: true } },
      skill: { select: { id: true, name: true, category: true } },
    },
  });

  return NextResponse.json({ match: updated });
}

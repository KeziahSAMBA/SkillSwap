import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      bio: true,
      skills: { include: { skill: true } },
      availabilities: true,
      badges: { include: { badge: true } },
      feedbacksRecv: {
        select: { rating: true, comment: true, giver: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      sessionsParts: {
        where: { session: { status: { in: ["PLANNED", "ONGOING"] } } },
        select: {
          session: {
            select: {
              id: true,
              title: true,
              type: true,
              status: true,
              scheduledAt: true,
              skill: { select: { name: true, category: true } },
              participants: { select: { userId: true } },
            },
          },
        },
        take: 5,
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  return NextResponse.json(user);
}

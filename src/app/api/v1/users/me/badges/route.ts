import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/users/me/badges
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const badges = await prisma.userBadge.findMany({
    where: { userId: user.id },
    include: {
      badge: true,
    },
    orderBy: { unlockedAt: "desc" },
  });

  return NextResponse.json({ badges });
}

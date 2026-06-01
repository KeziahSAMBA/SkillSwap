import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/users/me/points
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const [points, aggregate] = await Promise.all([
    prisma.point.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.point.aggregate({
      where: { userId: user.id },
      _sum: { amount: true },
    }),
  ]);

  return NextResponse.json({
    total: aggregate._sum.amount ?? 0,
    history: points,
  });
}

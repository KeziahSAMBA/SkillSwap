import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DAY_MAP: Record<string, number> = {
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
  Vendredi: 5,
  Samedi: 6,
  Dimanche: 0,
};

const LEVEL_MAP: Record<string, string> = {
  Expert: "EXPERT",
  Avancé: "ADVANCED",
  Intermédiaire: "INTERMEDIATE",
  Débutant: "BEGINNER",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const search = searchParams.get("search")?.trim() || "";
  const levelsParam = searchParams.get("levels") || "";
  const daysParam = searchParams.get("days") || "";
  const category = searchParams.get("category") || "";

  const levels = levelsParam
    ? levelsParam.split(",").map((l) => LEVEL_MAP[l]).filter(Boolean)
    : [];

  const days = daysParam
    ? daysParam.split(",").map((d) => DAY_MAP[d]).filter((d) => d !== undefined)
    : [];

  const users = await prisma.user.findMany({
    where: {
      skills: {
        some: {
          type: "TEACH",
          ...(levels.length > 0 && { level: { in: levels as ("BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT")[] } }),
          skill: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(category && category !== "Tous" && { category: { equals: category, mode: "insensitive" } }),
          },
        },
      },
      ...(days.length > 0 && {
        availabilities: {
          some: { dayOfWeek: { in: days } },
        },
      }),
    },
    select: {
      id: true,
      name: true,
      bio: true,
      skills: {
        where: { type: "TEACH" },
        include: { skill: { select: { name: true, category: true } } },
      },
      availabilities: {
        select: { dayOfWeek: true, startTime: true, endTime: true },
      },
      _count: {
        select: { sessionsParts: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(users);
}

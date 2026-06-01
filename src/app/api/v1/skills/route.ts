import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/skills?category=&search=
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const skills = await prisma.skill.findMany({
    where: {
      ...(category && { category }),
      ...(search && { name: { contains: search, mode: "insensitive" } }),
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ skills });
}

// POST /api/v1/skills  (crée une compétence si elle n'existe pas encore)
export async function POST(req: NextRequest) {
  const { error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { name, category } = body;

  if (!name || !category) {
    return NextResponse.json(
      { error: "Les champs name et category sont requis." },
      { status: 400 }
    );
  }

  const skill = await prisma.skill.upsert({
    where: { name },
    create: { name, category },
    update: {},
  });

  return NextResponse.json({ skill }, { status: 201 });
}

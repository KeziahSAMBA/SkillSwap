import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SkillType } from "@/generated/prisma/client";

// GET /api/v1/matching/search?skillId=&lookingFor=TEACHING|LEARNING
//
// lookingFor=TEACHING → je veux apprendre, je cherche quelqu'un qui enseigne
// lookingFor=LEARNING  → je veux enseigner, je cherche quelqu'un qui apprend
export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { searchParams } = req.nextUrl;
  const skillId = searchParams.get("skillId");
  const lookingFor = searchParams.get("lookingFor") as SkillType | null;

  if (!skillId || !lookingFor) {
    return NextResponse.json(
      { error: "Les paramètres skillId et lookingFor sont requis." },
      { status: 400 }
    );
  }

  if (!Object.values(SkillType).includes(lookingFor)) {
    return NextResponse.json(
      { error: "lookingFor doit être TEACHING ou LEARNING." },
      { status: 400 }
    );
  }

  const skillExists = await prisma.skill.findUnique({ where: { id: skillId } });
  if (!skillExists) {
    return NextResponse.json({ error: "Compétence introuvable." }, { status: 404 });
  }

  const matches = await prisma.userSkill.findMany({
    where: {
      skillId,
      type: lookingFor,
      userId: { not: user.id },
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, photoUrl: true },
      },
      skill: {
        select: { id: true, name: true, category: true },
      },
    },
    orderBy: { level: "desc" },
  });

  return NextResponse.json({ results: matches });
}

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SkillLevel, SkillType } from "@/generated/prisma/client";

const VALID_TYPES = Object.values(SkillType);
const VALID_LEVELS = Object.values(SkillLevel);

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const skills = await prisma.userSkill.findMany({
    where: { userId: user.id },
    include: { skill: { select: { id: true, name: true, category: true } } },
  });

  return NextResponse.json({ skills });
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { skillId, type, level } = body;

  if (!skillId || !type || !level) {
    return NextResponse.json(
      { error: "Les champs skillId, type et level sont requis." },
      { status: 400 }
    );
  }

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `type doit être l'une des valeurs : ${VALID_TYPES.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!VALID_LEVELS.includes(level)) {
    return NextResponse.json(
      { error: `level doit être l'une des valeurs : ${VALID_LEVELS.join(", ")}.` },
      { status: 400 }
    );
  }

  const skillExists = await prisma.skill.findUnique({ where: { id: skillId } });
  if (!skillExists) {
    return NextResponse.json({ error: "Compétence introuvable." }, { status: 404 });
  }

  const userSkill = await prisma.userSkill.upsert({
    where: { userId_skillId_type: { userId: user.id, skillId, type } },
    create: { userId: user.id, skillId, type, level },
    update: { level },
    include: { skill: { select: { id: true, name: true, category: true } } },
  });

  return NextResponse.json({ userSkill }, { status: 201 });
}

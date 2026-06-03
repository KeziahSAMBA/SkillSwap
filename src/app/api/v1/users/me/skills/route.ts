import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

function getUserIdFromToken(req: NextRequest): string | null {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ message: "Non autorisé." }, { status: 401 });

  const { skillId, skillName, type, level } = await req.json();

  if (!type || !level) {
    return NextResponse.json({ message: "type et level sont requis." }, { status: 400 });
  }

  let resolvedSkillId = skillId;

  if (!resolvedSkillId && skillName) {
    const skill = await prisma.skill.upsert({
      where: { name: skillName.trim() },
      create: { name: skillName.trim() },
      update: {},
    });
    resolvedSkillId = skill.id;
  }

  if (!resolvedSkillId) {
    return NextResponse.json({ message: "skillId ou skillName requis." }, { status: 400 });
  }

  const userSkill = await prisma.userSkill.create({
    data: { userId, skillId: resolvedSkillId, type, level },
    include: { skill: true },
  });

  return NextResponse.json(userSkill, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ message: "Non autorisé." }, { status: 401 });

  const { userSkillId } = await req.json();

  await prisma.userSkill.deleteMany({ where: { id: userSkillId, userId } });

  return NextResponse.json({ ok: true });
}

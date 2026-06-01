import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userSkillId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { userSkillId } = await params;

  const userSkill = await prisma.userSkill.findUnique({
    where: { id: userSkillId },
  });

  if (!userSkill || userSkill.userId !== user.id) {
    return NextResponse.json(
      { error: "Compétence introuvable." },
      { status: 404 }
    );
  }

  await prisma.userSkill.delete({ where: { id: userSkillId } });

  return new NextResponse(null, { status: 204 });
}

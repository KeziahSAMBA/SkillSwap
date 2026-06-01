import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { name, photoUrl } = body;

  if (!name && photoUrl === undefined) {
    return NextResponse.json(
      { error: "Aucun champ à mettre à jour." },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(name && { name }),
      ...(photoUrl !== undefined && { photoUrl }),
    },
    select: { id: true, name: true, email: true, photoUrl: true, updatedAt: true },
  });

  return NextResponse.json({ user: updated });
}

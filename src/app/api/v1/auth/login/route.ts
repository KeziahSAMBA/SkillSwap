import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Les champs email et password sont requis." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 }
    );
  }

  const token = await signToken({ sub: user.id, email: user.email });

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const justificatif = formData.get("justificatif") as File | null;

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Tous les champs sont requis." }, { status: 400 });
  }

  if (!justificatif || justificatif.size === 0) {
    return NextResponse.json({ message: "Le justificatif de scolarité est obligatoire." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Cet email est déjà utilisé." }, { status: 409 });
  }

  const ext = justificatif.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "justificatifs");
  const filePath = path.join(uploadDir, filename);
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await justificatif.arrayBuffer());
  await writeFile(filePath, buffer);

  const justificatifUrl = `/uploads/justificatifs/${filename}`;

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, justificatifUrl },
  });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"] }
  );

  return NextResponse.json(
    { token, user: { id: user.id, name: user.name, email: user.email } },
    { status: 201 }
  );
}

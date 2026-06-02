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

export async function GET() {
  const posts = await prisma.feedPost.findMany({
    include: { author: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ message: "Le contenu est requis." }, { status: 400 });
  }

  const post = await prisma.feedPost.create({
    data: { authorId: userId, content: content.trim() },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json(post, { status: 201 });
}

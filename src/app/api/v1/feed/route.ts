import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/v1/feed
export async function GET(req: NextRequest) {
  const { error } = await getAuthUser(req);
  if (error) return error;

  const posts = await prisma.feedPost.findMany({
    include: {
      author: { select: { id: true, name: true, photoUrl: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ posts });
}

// POST /api/v1/feed
export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { content } = body;

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json(
      { error: "Le champ content est requis." },
      { status: 400 }
    );
  }

  const post = await prisma.feedPost.create({
    data: { authorId: user.id, content: content.trim() },
    include: {
      author: { select: { id: true, name: true, photoUrl: true } },
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}

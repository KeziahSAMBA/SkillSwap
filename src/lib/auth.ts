import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import { prisma } from "./prisma";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
};

type AuthResult =
  | { user: AuthUser; error: null }
  | { user: null; error: NextResponse };

export async function getAuthUser(req: NextRequest): Promise<AuthResult> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Token d'authentification manquant." },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.slice(7);

  let payload;
  try {
    payload = await verifyToken(token);
  } catch {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Token invalide ou expiré." },
        { status: 401 }
      ),
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, name: true, email: true, photoUrl: true },
  });

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 401 }
      ),
    };
  }

  return { user, error: null };
}

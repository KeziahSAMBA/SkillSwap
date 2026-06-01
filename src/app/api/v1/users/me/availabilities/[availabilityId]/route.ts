import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ availabilityId: string }> }
) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const { availabilityId } = await params;

  const availability = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!availability || availability.userId !== user.id) {
    return NextResponse.json(
      { error: "Disponibilité introuvable." },
      { status: 404 }
    );
  }

  await prisma.availability.delete({ where: { id: availabilityId } });

  return new NextResponse(null, { status: 204 });
}

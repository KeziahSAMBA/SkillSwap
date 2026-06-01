import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function GET(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const availabilities = await prisma.availability.findMany({
    where: { userId: user.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ availabilities });
}

export async function POST(req: NextRequest) {
  const { user, error } = await getAuthUser(req);
  if (error) return error;

  const body = await req.json();
  const { dayOfWeek, startTime, endTime } = body;

  if (dayOfWeek === undefined || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Les champs dayOfWeek, startTime et endTime sont requis." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    return NextResponse.json(
      { error: "dayOfWeek doit être un entier entre 0 (dimanche) et 6 (samedi)." },
      { status: 400 }
    );
  }

  if (!TIME_REGEX.test(startTime) || !TIME_REGEX.test(endTime)) {
    return NextResponse.json(
      { error: "startTime et endTime doivent être au format HH:MM." },
      { status: 400 }
    );
  }

  if (startTime >= endTime) {
    return NextResponse.json(
      { error: "startTime doit être antérieur à endTime." },
      { status: 400 }
    );
  }

  const availability = await prisma.availability.create({
    data: { userId: user.id, dayOfWeek, startTime, endTime },
  });

  return NextResponse.json({ availability }, { status: 201 });
}

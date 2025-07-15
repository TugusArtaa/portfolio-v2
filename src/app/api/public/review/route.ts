import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, origin, review } = await req.json();
    if (!name || !origin || !review || review.length < 10) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const newReview = await prisma.review.create({
      data: { name, origin, review },
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

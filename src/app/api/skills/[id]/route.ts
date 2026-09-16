import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// Handler GET: Mengambil data skill berdasarkan id
export async function GET(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const skill = await prisma.skill.findUnique({
      where: { id },
    });
    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data skill berdasarkan id
export async function PUT(req: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const body = await req.json();
    const { name, level, icon } = body;
    // Validasi: name wajib diisi
    if (!name) {
      return NextResponse.json(
        { message: "Field 'name' wajib diisi" },
        { status: 400 }
      );
    }
    const updated = await prisma.skill.update({
      where: { id },
      data: {
        name,
        level: level ?? null,
        icon: icon ?? null,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler DELETE: Menghapus data skill berdasarkan id
export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

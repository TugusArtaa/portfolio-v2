import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// Handler GET: Mengambil data tool berdasarkan id
export async function GET(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const tool = await prisma.tool.findUnique({
      where: { id },
    });
    if (!tool) {
      return NextResponse.json({ message: "Tool not found" }, { status: 404 });
    }
    return NextResponse.json(tool);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data tool berdasarkan id
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
    const updated = await prisma.tool.update({
      where: { id },
      data: { name, level, icon },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler DELETE: Menghapus data tool berdasarkan id
export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    await prisma.tool.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

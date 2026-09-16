import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// Handler GET: Mengambil data 'about' berdasarkan id
export async function GET(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const about = await prisma.about.findUnique({
      where: { id },
    });
    if (!about) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }
    return NextResponse.json(about);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data 'about' berdasarkan id
export async function PUT(req: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const body = await req.json();
    const { content } = body;
    // Validasi: content wajib diisi
    if (!content) {
      return NextResponse.json(
        { message: "Field 'content' wajib diisi" },
        { status: 400 }
      );
    }
    const updated = await prisma.about.update({
      where: { id },
      data: { content },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler DELETE: Menghapus data 'about' berdasarkan id
export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    await prisma.about.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

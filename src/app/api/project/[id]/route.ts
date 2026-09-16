import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// Handler GET: Mengambil data project berdasarkan id
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data project berdasarkan id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const data = await req.json();

    // Validasi field wajib
    if (!data.title || !data.slug || !data.description || !data.coverImage) {
      return NextResponse.json(
        {
          message:
            "Field 'title', 'slug', 'description', dan 'coverImage' wajib diisi",
        },
        { status: 400 }
      );
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        techStack: data.techStack,
        coverImage: data.coverImage,
        url: data.url,
        image1: data.image1 ?? null,
        image2: data.image2 ?? null,
        image3: data.image3 ?? null,
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

// Handler DELETE: Menghapus data project berdasarkan id
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await requireAuth();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// Handler GET: Mengambil semua data project, diurutkan dari terbaru
export async function GET() {
  try {
    await requireAuth();
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler POST: Menambah data project baru
export async function POST(req: Request) {
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

    // Validasi opsional: image1, image2, image3 boleh kosong/null
    const newProject = await prisma.project.create({
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        techStack: data.techStack ?? [],
        coverImage: data.coverImage,
        url: data.url ?? null,
        userId: data.userId ?? null,
        image1: data.image1 ?? null,
        image2: data.image2 ?? null,
        image3: data.image3 ?? null,
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

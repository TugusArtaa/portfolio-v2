import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// Handler GET: Mengambil data sertifikat berdasarkan id
export async function GET(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const cert = await prisma.certificate.findUnique({
      where: { id },
    });
    if (!cert) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(cert);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data sertifikat berdasarkan id
export async function PUT(req: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    const body = await req.json();
    const { title, issuer, issueDate, expireDate, image, userId } = body;
    // Validasi: title, issuer, dan issueDate wajib diisi
    if (!title || !issuer || !issueDate) {
      return NextResponse.json(
        { message: "Field 'title', 'issuer', dan 'issueDate' wajib diisi" },
        { status: 400 }
      );
    }
    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        issuer,
        issueDate: new Date(issueDate),
        expireDate: expireDate ? new Date(expireDate) : null,
        image,
        userId,
        updatedAt: new Date(),
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

// Handler DELETE: Menghapus data sertifikat berdasarkan id
export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  try {
    await requireAuth();
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

import prisma from "@/config/prisma";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const getdata = await prisma.post.findUnique({
      where: { id },
    });
    if (!getdata) {
      return NextResponse.json({ message: "NOT FOUND" }, { status: 404 });
    }
    return NextResponse.json(getdata);
  } catch (error) {
    return NextResponse.json({ message: "GET ERROR", error }, { status: 501 });
  }
}
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { nom, prenom, sexe } = await request.json();
    const postdata = await prisma.post.update({
      where: { id },
      data: { nom, prenom, sexe },
    });

    return NextResponse.json(postdata);
  } catch (error) {
    return NextResponse.json({ message: "POST ERROR", error }, { status: 501 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "DELETE SUCCESS" });
  } catch (error) {
    return NextResponse.json(
      { message: "DELETE ERROR", error },
      { status: 501 }
    );
  }
}

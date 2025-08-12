import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    console.log(books);
    return NextResponse.json(books);
  } catch (error) {
    console.error("GET /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, author, genre } = await req.json();
    console.log( title, author, genre)
    
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (typeof author !== "string" || author.trim() === "") {
      return NextResponse.json({ error: "Author is required" }, { status: 400 });
    }
    if (typeof genre !== "string" || genre.trim() === "") {
      return NextResponse.json({ error: "Genre is required" }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: { title: title.trim(), author: author.trim(), genre: genre.trim() },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("POST /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 
    const bookId = Number(id);

    const deletedBook = await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json(deletedBook);
  } catch (error) {
    console.error("DELETE /api/books/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
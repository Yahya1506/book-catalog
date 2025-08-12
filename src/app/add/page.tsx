"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to add a book.");
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !genre.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, genre }),
      });

      if (res.ok) {
        toast.success("Book added successfully!");
        router.push("/");
      } else if (res.status === 401) {
        toast.error("Unauthorized. Please log in.");
        router.push("/auth/signin");
      } else {
        toast.error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("An error occurred while adding the book");
    }
  };

  if (status === "loading") {
    return <p className="p-6">Checking authentication...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </main>
  );
}

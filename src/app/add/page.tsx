"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();

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
        router.push("/"); // Redirect to home
      } else {
        toast.error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("An error occurred while adding the book");
    }
  };

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

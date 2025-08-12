"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link"

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });

      if (res.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      } else {
        toast.error("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("An error occurred while deleting the book.");
    }
  };

  if (loading) return <p className="p-4">Loading books...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book Catalog</h1>
      <Link
        href="/add"
        className="inline-block mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Book
      </Link>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Genre</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="border p-2">{book.id}</td>
                <td className="border p-2">{book.title}</td>
                <td className="border p-2">{book.author}</td>
                <td className="border p-2">{book.genre}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
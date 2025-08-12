"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Sign In with Google
      </button>
    </main>
  );
}

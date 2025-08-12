"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-gray-600">You are not signed in</p>
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }


  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-800 font-medium">
        {session.user.name || session.user.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

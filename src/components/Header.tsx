"use client";

import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

export default function Header() {
  const pathname = usePathname();

  // Hide header on login or signup pages
  if (pathname === "/auth/signin" || pathname === "/auth/signup") {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <h1 className="text-lg font-bold">Book Catalog</h1>
      <UserMenu />
    </header>
  );
}

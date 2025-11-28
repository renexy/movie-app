"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between w-full h-[5dvh] p-[5px]">
      <Link href="/" className="text-2xl font-bold cursor-pointer">
        Home
      </Link>
      <span>Login</span>
    </div>
  );
}

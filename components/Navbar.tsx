import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 h-20 w-full shadow-xs backdrop-blur-xs">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link href={`/`} className="text-xl font-bold text-blue-600">
          Resume Generator
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href={`/create-resume`} className="links">
            Create Resume
          </Link>

          <Link href={`/review-resume`} className="links">
            Review Resume
          </Link>
          <Link href={`/login`} className="links">
            <UserCircle />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

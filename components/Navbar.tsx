import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { UserCircle } from "lucide-react";
import { getUserSession } from "@/lib/getUserSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar = async () => {
  const session = await getUserSession();
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
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                    className="h-10 w-10 rounded-full focus:ring-0 focus:outline-none"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={`/login`} className="links">
              <UserCircle />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

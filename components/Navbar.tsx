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
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";

const Navbar = async () => {
  const session = await getUserSession();
  let name = "";
  if (session) {
    const names = session.user.name.split(" ");
    name = names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }
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
                  <AvatarFallback className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    {name}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button
                      type="submit"
                      variant={"outline"}
                      className="border-none pl-2 hover:bg-transparent"
                    >
                      Logout
                    </Button>
                  </form>
                </DropdownMenuItem>
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

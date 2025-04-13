import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center py-12">
      <Link href="#" className="flex items-center justify-center">
        <span className="ml-2 text-2xl font-bold">Plivo</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6 font-medium">
        <Link className="text-sm hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm hover:underline underline-offset-4" href="#">
          Contact
        </Link>
        <div className="ml-auto flex items-center gap-1 sm:gap-3 font-medium">
          <Button
            asChild
            variant="outline"
            className="outline-8 outline-slate-800"
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button className="bg-slate-800 text-white">
            <Link href="/auth/login?screen_hint=signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

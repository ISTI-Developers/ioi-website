
import { useState } from "react";
import type { ReactNode } from "react";
import Menu from "./menu/menu";
import Hamburger from "../ui/hamburger-menu";



interface NavbarProps {
  children?: ReactNode;
}



export default function Navbar({ children }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex  w-full relative ">
     
      <header className="flex justify-between w-full px-2  lg:px-24 py-5 items-center bg-black border-b sticky top-0 z-40">
        <h1 className="text-md font-bold uppercase text-primary tracking-widest">Innovation One</h1>
        <Hamburger active={open} setActive={setOpen} />
      </header>

      <Menu open={open} setOpen={setOpen} />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}




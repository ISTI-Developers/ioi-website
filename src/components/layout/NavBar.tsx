
import { useState } from "react";
import type { ReactNode } from "react";
import company_logo from "@/assets/ioi_LogoDesign_MainLogo.png"
import Menu from "./menu/menu";
import Hamburger from "../ui/hamburger-menu";



interface NavbarProps {
  children?: ReactNode;
}



  export default function Navbar({ children }: NavbarProps) {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex  w-full relative ">
        <header className="flex justify-between w-full px-2  lg:px-24 py-5 items-center bg-black  sticky top-0 z-40">
          <img src={company_logo} className="h-10 w-60" alt="Innovation One Inc Logo"/>
          <Hamburger active={open} setActive={setOpen} />
        </header>
        <Menu open={open} setOpen={setOpen} />
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    );
  }




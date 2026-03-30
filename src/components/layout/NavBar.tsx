
import { useState } from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Menu from "./menu/menu";
import Hamburger from "../ui/hamburger-menu";



interface NavbarProps {
  children?: ReactNode;
}



export default function Navbar({ children }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full relative ">
<header className="fixed top-0 left-0 w-full flex justify-between px-2 lg:px-24 py-5 items-center z-50">
          <div>
          <Link
            to={"/"}>
            <img src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/InnovationOneLogo%2Fioi_LogoDesign_MainLogo.png?alt=media&token=0083aab3-cfa0-4412-b4cf-ed88facb09a2"
            className="h-10 w-60 opacity-85" 
            alt="Innovation One Inc Logo" 
            />
          </Link>
        </div>

        <Hamburger active={open} setActive={setOpen} />

      </header>


      {open && <Menu open={open} setOpen={setOpen} />}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}




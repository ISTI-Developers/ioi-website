import { Link } from "react-router-dom";
import company_logo from "@/assets/ioi_LogoDesign_MainLogo.png"
import Hamburger from "../../ui/hamburger-menu";

interface MenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Menu({ open, setOpen }: MenuProps) {
  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Careers", path: "/careers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex flex-col items-start bg-linear-to-b from-dark to-light">
      <header className="flex justify-between w-full px-2 sm:px-8 lg:px-24 py-5 items-center">
        <img src={company_logo} className="h-10 w-60" alt="Innovation One Inc Logo" />
        <Hamburger active={open} setActive={setOpen} />
      </header>

      <div className="flex flex-col text-left font-black mx-auto md:-mt-2 lg:-mt-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-heading text-[15vw] md:text-[80px] lg:text-[136px] leading-[0.90] hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
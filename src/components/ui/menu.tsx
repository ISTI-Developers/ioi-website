import { Link } from "react-router-dom";

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
        <h1 className="text-md font-bold uppercase text-white tracking-widest">Innovation One</h1>
        <button 
          type="button" 
          className="cursor-pointer text-white px-2" 
          onClick={() => setOpen(false)}
        >
          X
        </button>
      </header>

      <div className="flex flex-col text-left font-black mx-auto md:-mt-2 lg:-mt-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-[12vw] md:text-[80px] lg:text-[135px] leading-[0.90] hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
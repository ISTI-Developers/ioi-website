import { Link } from "react-router-dom";


const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Careers", path: "/careers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export function AppNavbar({setOpen }: { open: boolean; setOpen: (open:boolean) => void}) {

    return (
        <>
            <div className="fixed inset-0 w-screen h-screen flex flex-col items-start bg-linear-to-b from-dark to-light">
                <header className="flex justify-between w-full px-6 md:px-24 lg:px-30 p-4 items-center">
                    <h1 className="text-md text-black">Innovation One</h1>
                    <button type="button" className="cursor-pointer text-white" onClick={() => setOpen(false)}>X</button>
                </header>

                <div className="flex flex-col text-left font-bold mx-auto  md:-mt-2 lg:-mt-6">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-[12vw] md:text-[80px] lg:text-[135px] leading-none hover:text-white transition colors tracker-normal"
                            onClick={() => setOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}


export default AppNavbar;

import { Link } from "react-router-dom";

export default function Footer() {
    const legalLinks = [
        { name: "Privacy Policy", href: "" },
        { name: "Terms of Use", href: "" }
    ];

    const socialLinks = [
        { name: "Facebook", href: "" },
        { name: "Twitter", href: "" },
        { name: "Linkedin", href: "https://www.linkedin.com/company/unitedneon/" },
        { name: "Instagram", href: "" },
    ];

    return (
        <footer className="w-full bg-black text-white py-5">
            <div className="px-2 sm:px-8 lg:px-24">
                <div className="mb-10 flex justify-center items-center w-full">
                    <p className="text-[8.3rem] text-center font-bold bg-linear-to-l from-dark to-light bg-clip-text text-transparent">
                        InnovationOne Inc
                    </p>
                </div>

                <div className="flex justify-between items-start mb-36">
                    <div className="flex items-center gap-x-4">
                        <p className="text-white text-sm w-56">
                            Want to collaborate? Have any questions? Slide into our email!
                        </p>
                        <form className="flex items-center">
                            <input className="border-b border-white/50 bg-transparent py-2 px-3 text-lightgray text-xs w-58" id="email" type="text" placeholder="Enter your email" />
                        </form>
                        <button className="text-white uppercase py-2 px-4 text-[0.625rem] bg-linear-to-l from-[#A1331B] to-[#E54D2E]">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex items-start">
                        <p className="text-white text-sm w-65 text-left">
                            Empowering Visionaries: Stories of Collaboration and Transformation
                        </p>
                    </div>
                </div>

                <div className="flex justify-between w-full text-[0.625rem] border-t border-white/10 pt-8">
                    <div className="flex gap-x-6">
                        {legalLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="text-white hover:text-gray-400 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="text-gray-500">
                        © 2024 InnovationOne. All rights reserved.
                    </div>

                    <div className="flex gap-x-6">
                        {socialLinks.map((link) => (
                            <Link key={link.name} to={link.href} target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
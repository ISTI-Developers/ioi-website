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
        <footer className="w-full bg-black text-white pt-30 pb-6 lg:pt-20 lg:pb-10">
            <div className="px-2 lg:px-24">
                <div className="lg:mb-10 flex justify-center items-center w-full">
                    <p className="text-[1.8rem] lg:text-[8.2rem] text-center font-bold bg-linear-to-l from-dark to-light bg-clip-text text-transparent">
                        InnovationOne Inc
                    </p>
                </div>

                <div className="hidden lg:flex justify-between items-start mb-36 ">
                    <div className="flex items-center gap-x-4 ">
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

                <div className="flex flex-col lg:flex-row justify-between  w-full text-[0.625rem] border-t border-white/10 pt-30 lg:pt-8">                    <div className="hidden lg:flex gap-x-6">
                    {legalLinks.map((link) => (
                        <Link key={link.name} to={link.href} className="text-white hover:text-gray-400 transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                    <div className="flex items-end text-gray-500 ">
                        © 2024 InnovationOne. All rights reserved.
                    </div>

                    <div className="hidden lg:flex gap-x-6">
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
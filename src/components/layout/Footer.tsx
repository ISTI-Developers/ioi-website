import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const [clicked, setClicked] = useState(false);

    const legalLinks = [
        { name: "Privacy Policy", href: "" },
        { name: "Terms of Use", href: "" }
    ];

    const socialLinks = [
        { name: "Facebook", href: "https://www.facebook.com/InnovationOneIncorporated" },
        { name: "Instagram", href: "https://www.instagram.com/innovationoneincorporated" },
        { name: "Tiktok", href: "https://www.tiktok.com/@innovationone.inc" },
    ];

    return (
        <footer
            className="w-full text-black pt-12 lg:pt-16 overflow-hidden relative"
            style={{
                backgroundImage: `url('YOUR_IMAGE_URL_HERE')`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#ff6014",
            }}
        >
            <div className="px-6 sm:px-10 lg:px-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 sm:gap-y-12 lg:gap-y-0 items-start mb-12 lg:mb-16">

                    <div className="col-span-1 sm:col-span-1 lg:col-span-4 flex flex-col">
                        <p className="text-black text-lg sm:text-xl font-medium leading-snug">
                            Empowering Visionaries: Stories of <br className="hidden sm:block" /> Collaboration and Transformation
                        </p>
                        <Link to="https://unmg.com.ph/" target="_blank" className="mt-15">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/InnovationOneLogo%2FUNMG_Logo.png?alt=media&token=ab4b0ced-6b11-493a-81a0-29d995d553b3"
                                className="h-10 w-auto object-contain cursor-pointer"
                                alt="UNMG Logo"
                            />
                        </Link>
                    </div>

                    <div className="col-span-1 sm:col-span-1 lg:col-span-4 lg:col-start-6 flex flex-col items-start gap-y-4">
                        <p className="text-black text-lg sm:text-xl font-medium leading-snug text-left">
                            Want to collaborate? Have any <br className="hidden sm:block" /> questions? Slide into our <br className="hidden sm:block" /> email!
                        </p>
                        <div className="flex items-end gap-x-3 w-full">
                            <input
                                className="border-b border-black/50 bg-transparent py-2 px-1 text-black text-base w-50 min-w-0 placeholder:text-black/60 focus:outline-none"
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                            />
                            <button
                                className={`uppercase py-2 px-4 text-xs sm:text-sm font-bold cursor-pointer tracking-widest shrink-0
                                    ${clicked
                                        ? "text-orange-700 bg-transparent border border-orange-900"
                                        : "text-white bg-[#5a1a0a]"
                                    }`}
                                onClick={() => setClicked(true)}
                            >
                                {clicked ? "Email Sent!" : "Collaborate"}
                            </button>
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:col-start-12 flex flex-row lg:flex-col gap-x-6 gap-y-3 lg:gap-x-0 flex-wrap lg:flex-nowrap items-start">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-black text-lg hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-y-0 border-t border-black/20 py-5 text-xs sm:text-sm lg:text-base">
                    <span className="text-black/80 text-center sm:text-left">© 2024 InnovationOne. All rights reserved.</span>
                    <div className="flex gap-x-6 sm:gap-x-8">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-black hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        <div className="w-full overflow-hidden leading-none mt-2">
            <p className="font-heading font-semibold text-[#7a2a0a] text-[12.2vw] whitespace-nowrap tracking-tight select-none w-full text-left pl-2 sm:pl-4">
                Innovation One
            </p>
        </div>
    </footer>
);
}
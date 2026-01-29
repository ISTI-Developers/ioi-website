import { LogoCarousel } from "../../ui/logo-carousel";

export function Clients() {
    return (
        <div className="w-full flex flex-col items-center md:px-10">
            
            <div className="w-full max-w-2xl text-left">
                
                <span className="text-orange-500 text-xs sm:text-sm tracking-widest block mb-4">
                    /// CLIENTS & PARTNERS
                </span>

                <div className="leading-[1.1] lg:leading-none flex flex-col">
                    <h1 className="text-white text-2xl lg:text-4xl font-bold">
                        Empowering Visionaries:
                    </h1>
                    <h2 className="text-white text-2xl lg:text-4xl font-bold">
                        Stories of Collaboration and Transformation
                    </h2>
                </div>

                <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-6">
                    Our clients are more than just collaborators—they are visionaries who inspire us to push the boundaries of design and innovation.
                </p>
            </div>

            <div className="py-20 w-full">
                <LogoCarousel />
            </div>
        </div>
    );
}
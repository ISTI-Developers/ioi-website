import { LogoCarousel } from "../../ui/logo-carousel";
import { useClients } from "@/hooks/useClients";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Clients() {
    const { data: clients, isLoading } = useClients();

    if (isLoading) return <p>Loading clients...</p>;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-24 space-y-12 ">
            <h1 className="text-white text-2xl lg:text-4xl font-bold w-120">
                Empowering Visionaries: Stories of Collaboration and Transformation
            </h1>


            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">


                <div className="flex items-center gap-2">
                    <Link to= "/projects" className="flex items-center gap-2 text-white lg-text-lg">
                    <span className="text-white lg:text-lg">
                        All Projects
                    </span>
                    <ArrowRight className="text-white h-4 w-4 mt-1" />
                    </Link>
                </div>


                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-xl  w-120">
                    Our clients are more than just collaborators—they are visionaries who inspire us to push the boundaries of design and innovation.
                </p>

            </div>
            <div className="mt-32 w-full">
                <LogoCarousel clients={clients ?? []} />
            </div>
        </div>
    );
}
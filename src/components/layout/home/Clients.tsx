import { LogoCarousel } from "../../ui/logo-carousel";
import { useClients } from "@/hooks/useClients";

export function Clients() {
    const { data: clients, isLoading } = useClients();

    if (isLoading) return <p>Loading clients...</p>;

    return (
        <div className="w-full">
            <h1 className="text-white text-2xl lg:text-4xl font-bold w-120">
                Empowering Visionaries: Stories of Collaboration and Transformation
            </h1>


            <div className="flex justify-between mt-4">

                <div>
                    <span className="text-white lg:text-lg">
                        All Projects
                    </span>
                    {/* <img src = "arm21.svg" className="h-20 w-20 inline-block ml-2" alt="Arrow pointing right" /> */}
                </div>


                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-xl  w-120">
                    Our clients are more than just collaborators—they are visionaries who inspire us to push the boundaries of design and innovation.
                </p>

            </div>
            <div className="mt-30 w-full">
                <LogoCarousel clients={clients ?? []} />
            </div>
        </div>
    );
}
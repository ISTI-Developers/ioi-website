import { LogoCarousel } from "../../ui/logo-carousel";
import { useClients } from "@/hooks/useClients";

export function Clients() {
  const { data: clients, isLoading } = useClients();

  if (isLoading) return <p>Loading clients...</p>;

    return (
        <div className="w-full flex flex-col items-center md:px-10 lg:px-95">

            <div className="w-full max-w-2xl text-left">

                <span className="text-orange-500 ttext-primary lg:text-xl uppercase tracking-widest block mb-4">
                    // CLIENTS & PARTNERS
                </span>

                <div className="leading-[1.1] lg:leading-none flex flex-col">
                    <h1 className="text-white text-2xl lg:text-4xl font-bold w-120">
                        Empowering Visionaries: Stories of Collaboration and Transformation
                    </h1>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-xl mt-6 w-120">
                    Our clients are more than just collaborators—they are visionaries who inspire us to push the boundaries of design and innovation.
                </p>
            </div>

            <div className="mt-30 w-full">
                <LogoCarousel clients={clients ?? []} />
            </div>
        </div>
    );
}
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { ClientMember } from "@/data/types";

interface ClientCardProps {
  clients: ClientMember[] | undefined;
}

export function LogoCarousel({ clients }: ClientCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [clients, emblaApi]);

  if (!clients || clients.length === 0) return null;

  const filteredClients = clients.filter(
    (c): c is ClientMember & { file: string } => !!c.file
  );

  return (
    <>
      {/* GRID — mobile only (hidden on lg and above) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:hidden">
        {filteredClients.map((client) => (
          <div key={client.client_id} className="flex items-center justify-center h-[90px]">
            <img
              src={client.file}
              alt={client.client_name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* CAROUSEL — desktop only (hidden on mobile) */}
      <div className="hidden lg:block relative w-screen left-1/2 -ml-[50vw] overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {filteredClients.map((client) => (
              <div key={client.client_id} className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] overflow-hidden">
                  <img
                    src={client.file}
                    alt={client.client_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
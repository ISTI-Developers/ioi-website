import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { ClientMember } from "@/data/types";

interface ClientCardProps {
  clients: ClientMember[] | undefined;
}

export function LogoCarousel({ clients }: ClientCardProps) {
  console.log(clients);


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

  return (
    <div className="relative w-screen left-1/2 -ml-[50vw] overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {clients.filter((c): c is ClientMember & { file: string } => !!c.file).map(client => (
            <div key={client.client_id} className="flex-[0_0_auto] pr-8">
              <div className="w-[300px] h-[90px] overflow-hidden">
              <img src={client.file} alt={client.client_name} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
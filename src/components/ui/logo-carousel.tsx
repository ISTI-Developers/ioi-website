import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { ClientMember } from "@/data/types";
import { API_BASE_URL } from "@/hooks/api/config";

interface ClientCardProps {
  clients: ClientMember[] | undefined;
}

export function LogoCarousel({ clients }: ClientCardProps) {
  console.log(clients);
  const baseUrl = API_BASE_URL;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
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
          {clients.filter(c => c.file).map(client => (
            <div key={client.client_id} className="flex-[0_0_auto] min-w-75 pr-8">
              <img src={`${baseUrl}/${client.file}`} alt={client.client_name} className="w-full h-80 object-cover rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const services = [
  { id: "/01", category: "Campaigns", title: "360 Campaign Projects", desc: "Transform your website into a user-friendly and visually appealing platform with our UX design expertise." },
  { id: "/02", category: "Content", title: "Multimedia Creation", desc: "Enhance your brand's visual appeal with our top-notch multi media design services." },
  { id: "/03", category: "Branding", title: "Branding Communication", desc: "Elevate your brand's image, communication and identity with our comprehensive branding strategies." },
  { id: "/04", category: "SEO/SEM", title: "Digital Advertisement", desc: "Elevate your brand's image and identity with our comprehensive branding strategies." },
  { id: "/05", category: "UI/UX", title: "Website Development", desc: "Transform your website into a user-friendly and visually appealing platform with our UX design expertise." },
  { id: "/06", category: "Research", title: "Marketing Strategy", desc: "Transform your website into a user-friendly and visually appealing platform with our UX design expertise." },
];

function ServiceCard({ item, index }: { item: typeof services[0]; index: number }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <span className="text-2xl text-gray">/{(index + 1).toString().padStart(2, "0")}</span>
        <h2 className="text-5xl text-white mb-10 lg:mb-20 font-bold">{item.category}</h2>
      </div>
      <h3 className="text-2xl text-white font-semibold">{item.title}</h3>
      <p className="text-xl text-[#777777] leading-relaxed sm:w-full lg:w-68 font-semibold">{item.desc}</p>
      <hr className="border-t border-white/20 sm:hidden w-full" />
    </div>
  );
}

export default function Services() {
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
  }, [emblaApi]);

  return (
    <div className="w-full">
      <section className="text-white py-10 lg:py-20 w-full">

        {/* GRID — mobile only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-x-12 gap-y-10 px-4 sm:px-6">
          {services.map((item, index) => (
            <ServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CAROUSEL — desktop only */}
        <div className="hidden lg:block relative w-screen left-1/2 -ml-[50vw] overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-x-12">
              {services.map((item, index) => (
                <div key={item.id} className="flex-[0_0_auto] w-[340px] pr-8">
                  <ServiceCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
import test from "@/assets/test.jpg";
import useEmblaCarousel from "embla-carousel-react";



const slides = [
  {
    id: 1,
    category: "DIGITAL PLATFORM",
    client: "Forbes",
    title: "OMRON: BE SURE",
    subtitle: "Campaign 2024/2025",
    image: test,
    statMain: "70% Increase in High Quality",
    statSub: "Inquiries & Advocacy Engagements",
    description: "Significant Behavior Change: from 80% Reactive Counterfeit Concerns to 70% Proactive Awareness & Inquiries.",
  },
  {
    id: 2,
    category: "INFLUENCER STRATEGY",
    client: "Vogue",
    title: "CLN LUXURY",
    subtitle: "KOL Collaboration 2025",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    statMain: "1.2M Total Reach",
    statSub: "Across Premium Lifestyle Segments",
    description: "Successfully transitioned the brand from traditional retail to a digital-first luxury positioning through strategic KOL seeding.",
  },
  {
    id: 3,
    category: "BRAND INNOVATION",
    client: "TechCrunch",
    title: "GLOBAL AMBASSADOR",
    subtitle: "Innovation One 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    statMain: "45% Brand Recall",
    statSub: "In Competitive Healthcare Markets",
    description: "The global launch focused on trust and precision, resulting in a massive spike in direct-to-consumer digital engagement.",
  }
];

export function CaseStudyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full bg-black py-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 lg:px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">

              <div className="flex flex-col h-full py-2 md:col-span-5 ">
                <div className="space-y-1">
                  <p className="text-orange-500 text-sm font-bold uppercase tracking-widest">// {slide.category}</p>
                  <h2 className="text-white text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.8] tracking-tighter">
                    Case <br /> Study:
                  </h2>
                  <p className="text-white text-2xl font-medium pt-20 hidden">
                    {slide.title} <br /> {slide.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-15 lg:mt-auto lg:pb-10">

                  <span className="text-white/20 text-4xl font-serif font-semibold tracking-tighter">Forbes</span>

                  <div className="flex gap-2">
                    <button onClick={scrollPrev} className="border border-white/20 px-2 py-1 hover:bg-white/10 transition text-white text-[20px] rounded-md">←</button>
                    <button onClick={scrollNext} className="border border-white/20 px-2 py-1 hover:bg-white/10 transition text-white text-[20px] rounded-md">→</button>

                  </div>

                </div>

                <div className="hidden md:block h-14"></div>


              </div>

              <div className="flex flex-col space-y-8  md:col-span-7">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={slide.image}
                    className="rounded-2xl w-full object-cover aspect-4/5 max-h-screen"
                    alt={slide.title}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full ">
                  <div>
                    <p className="text-white text-xs lg:text-xl  leading-tight">{slide.statMain}</p>
                    <p className="text-white text-xs text-md lg:text-xl leading-tight">{slide.statSub}</p>
                  </div>

                  <div className="relative pr-14">
                    <p className="text-white/50 text-[12px] leading-relaxed ">
                      {slide.description}
                    </p>
                    <div className="absolute right-0 top-0">
                      <button className="border border-white/20 w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition text-white rounded-md">
                        ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




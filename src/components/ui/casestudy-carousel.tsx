import useEmblaCarousel from "embla-carousel-react";
import { useImageUrl } from "../../api/useImageUrl";

const slides = [
  {
    id: 1,
    category: "DIGITAL PLATFORM",
    pub_name: "Forbes",
    client: "OMRON",
    title: "BE SURE",
    subtitle: "Campaign 2024/2025",
    image: "omron.webp",
    statMain: "70% Increase in High Quality",
    statSub: "Inquiries & Advocacy Engagements",
    description: "Significant Behavior Change: from 80% Reactive Counterfeit Concerns to 70% Proactive Awareness & Inquiries.",
  },
  // {
  //   id: 2,
  //   category: "INFLUENCER STRATEGY",
  //   pub_name: "Vogue",
  //   client: "CLN",
  //   title: "CLN LUXURY",
  //   subtitle: "KOL Collaboration 2025",
  //   image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  //   statMain: "1.2M Total Reach",
  //   statSub: "Across Premium Lifestyle Segments",
  //   description: "Successfully transitioned the brand from traditional retail to a digital-first luxury positioning through strategic KOL seeding.",
  // },
  // {
  //   id: 3,
  //   category: "BRAND INNOVATION",
  //   pub_name: "Vogue",
  //   client: "IDK",

  //   title: "GLOBAL AMBASSADOR",
  //   subtitle: "Innovation One 2024",
  //   image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  //   statMain: "45% Brand Recall",
  //   statSub: "In Competitive Healthcare Markets",
  //   description: "The global launch focused on trust and precision, resulting in a massive spike in direct-to-consumer digital engagement.",
  // }
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
           <Slide key={slide.id} slide={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide({ slide }: { slide: typeof slides[0] }) {
  const { url } = useImageUrl(slide.image);
  return <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 lg:px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">

              <div className="flex flex-col h-full py-2 md:col-span-5 ">
                <div className="space-y-1">
                  <p className="text-orange-500 lg:text-xl font-bold uppercase tracking-widest">// {slide.category}</p>
                  <h1 className="font-body text-white text-6xl md:text-7xl lg:text-[7rem] font-bold leading-[0.8] ">
                    Case <br /> Study:
                  </h1>

                  <h2 className=" font-body hidden lg:block text-white mt-24 text-md lg:text-[3rem]/14 font-semibold ">
                    {slide.client} : {slide.title} {slide.subtitle}
                  </h2>

                  {/* <p className="text-white text-9xl font-medium pt-20 hidden">
                    {slide.title} <br /> {slide.subtitle}
                  </p> */}

                </div>

                <div className="flex items-center justify-between mt-15 lg:mt-auto lg:pb-16">

                  <span className="text-white/20 text-4xl font-serif font-semibold tracking-tighter">{slide.pub_name}</span>

                  {/* <div className="flex gap-2">
                    <button
                      onClick={scrollPrev}
                      className="flex items-center justify-center w-10 h-10 border border-white/20 hover:bg-white/10 transition text-white text-[20px] rounded-md"
                    >
                      ←
                    </button>

                    <button
                      onClick={scrollNext}
                      className="flex items-center justify-center w-10 h-10 border border-white/20 hover:bg-white/10 transition text-white text-[20px] rounded-md"
                    >
                      →
                    </button>

                  </div> */}

                </div>

                <div className="hidden md:block h-14"></div>
              </div>

              <div className="flex flex-col space-y-8  md:col-span-7">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={url || slide.image}
                    className="rounded-2xl lg:w-250 object-cover aspect-4/5 lg:h-200"
                    alt={slide.title}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 w-full ">
                  <div>
                    <p className="text-white text-xs lg:text-2xl  leading-tight">{slide.statMain}</p>
                    <p className="text-white text-xs text-md lg:text-2xl leading-tight">{slide.statSub}</p>
                  </div>

                  <div className="relative pr-20">
                    <p className="text-white/50 text-[15px] leading-relaxed ">
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
}


import Services from "../components/layout/home/Services";

import { useProjects } from "@/hooks/useProjects";
import { Clients } from "../components/layout/home/Clients";

import { InnovateSection } from "@/components/layout/InnovateSection";

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    // <div className="relative rounded-2xl bg-linear-to-br from-red-800 via-orange-600 to-yellow-400 shadow-xl text-white overflow-hidden backdrop-blur-lg border border-orange-300/40">
    //   <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-yellow-400/30 rounded-full blur-3xl"></div>
    //   <div className="absolute top-0 right-0 w-44 h-44 bg-red-400/25 rounded-full blur-2xl"></div>
    //   <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent rounded-[100%]"></div>
    //   <div className="absolute bottom-4 left-1/4 w-72 h-28 bg-gradient-to-r from-yellow-300/20 via-transparent to-transparent -rotate-12 blur-2xl rounded-full"></div>
    //   <h1 className="text-center text-9xl font-bold">{value}</h1>
    //   <h2 className="text-center p-2 mb-4">{label}</h2>
    // </div>
    <div className="relative rounded-2xl bg-linear-to-br from-red-800 via-orange-600 to-yellow-400 shadow-xl/20 text-white overflow-hidden backdrop-blur-lg border border-orange-300/40">
      <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-yellow-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-44 h-44 bg-red-400/25 rounded-full blur-2xl "></div>
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent rounded-[100%]"></div>
      <div className="absolute bottom-4 left-1/4 w-72 h-28 bg-linear-to-r from-yellow-300/20 via-transparent to-transparent -rotate-12 blur-2xl rounded-full "></div>
      <h1 className="text-center text-5xl sm:text-6xl md:text-[150px] font-black">
        {value}
      </h1>
      <h2 className="text-center text-sm sm:text-base md:text-lg p-2 mb-4 font-extrabold">
        {label}
      </h2>
    </div>
  );
}

const stats = [
  { value: "+15", label: "YEARS OF EXPERIENCE" },
  { value: "+25", label: "TEAM MEMBERS" },
  { value: "+50", label: "PROJECTS" },
  { value: "+20", label: "CLIENTS" },
];

function Home() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (!projects) return <p>Project not found</p>;

  return (
    <div>
      <div className="relative">
        <div className="relative w-full overflow-hidden">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/home%2Fhero.jpg?alt=media&token=f329aa40-c72d-4951-b391-1985d248f21b"
            className="w-full h-90 lg:h-full object-cover object-center sm:object-left lg:object-bottom mt-100 lg:mt-5"
          />

          <p
            className="
            absolute inset-0 flex items-start justify-center
            pt-10 sm:pt-16 md:pt-20
            font-hero uppercase text-primary font-bold
            mt-15 lg:mt-5
            text-[140px] sm:text-[160px] md:text-[15vw] lg:text-[19vw]
            leading-none tracking-wider
            px-2
          "
          >
            RULE THE FEED
          </p>
        </div>

        <div className="translate-y-1/2 left-0 right-0 px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden space-y-12 lg:space-y-42">
        <div>
          {/* <Hero
          isHome
          title={
            <>
              <span className="block">We Create</span>
              <span className="block tracking-[4.5]">Campaigns&nbsp;That</span>
              <span className="block">Matter.</span>
            </>
          }
          description="Located in Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands."
        /> */}
        </div>

        {/* <div>
          <div className='flex w-full items-center justify-between text-white'>
            <h2 className='text-white text-lg sm:text-2xl lg:text-3xl py-2 font-bold'>Projects</h2>
            <span className="text-md">More +500</span>
          </div>


          <div className="-ml-50 z-0">
            <HomeCarousel projects={projects} />
          </div>
        </div> */}

        <div className="mt-30">
          <Services />
        </div>

        {/* <Experience /> */}

        {/* <FeaturedImage section="home_bottom" /> */}
        <div className="rounded-lg overflow-hidden w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/home%2Fhome_video.mp4?alt=media&token=327bc4a1-6b8e-432b-99c9-c14375e0a761"
            autoPlay
            loop
            muted
            playsInline
            className="brightness-[0.7] w-full block"
          />
        </div>
        <div>
          <Clients />
        </div>
        {/*<CaseStudyCarousel />
         <ContactForm /> */}

        <div className="mb-20">
          <InnovateSection />
        </div>
      </div>
    </div>
  );
}

export default Home;

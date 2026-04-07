import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import Services from "../components/layout/home/Services";
import Experience from "../components/layout/home/Experience";
import { HomeCarousel } from "../components/ui/home-carousel";
import { FeaturedImage } from "../components/ui/featured-image";
import { ContactForm } from "../components/pages/forms/contact";
import { useProjects } from "@/hooks/useProjects";
import { Clients } from "../components/layout/home/Clients";
import Hero from "../components/ui/hero";


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
      <h1 className="text-center text-9xl font-bold">{value}</h1>
      <h2 className="text-center p-2 mb-4">{label}</h2>
    </div>

  )
}

const stats = [
  { value: "+15", label: "Years of Experience" },
  { value: "+25", label: "Team Members" },
  { value: "+50", label: "Projects" },
  { value: "+20", label: "Clients" },
];



function Home() {

  const { data: projects, isLoading } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (!projects) return <p>Project not found</p>;


  return (
    <div>
      <div className="relative">
        <video src="hero.mp4" autoPlay loop muted className="brightness-70" />
        <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

        </div>


      </div>
      <div className="w-full overflow-x-hidden px-2 lg:px-25 flex flex-col space-y-12 lg:space-y-42">
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

        <div>
          <Services />
        </div>

        {/* <Experience /> */}

        <div className="">
          <FeaturedImage section="home_bottom" />
        </div>

        <Clients />
        <CaseStudyCarousel />
        {/* <ContactForm /> */}
      </div>
    </div>
  )
}

export default Home;
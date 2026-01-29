import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import Services from "../components/layout/home/Services";
import Experience from "../components/layout/home/Experience";
import Hero from "../components/layout/home/Hero";
import { HomeCarousel } from "../components/ui/home-carousel";
import { ImageCard } from "../components/ui/image-card";
import { ContactForm } from "../components/pages/forms/contact";
import { Clients } from "../components/layout/home/Clients";



function Home() {
  return (
    <div className="w-full overflow-x-hidden px-2 lg:px-25 flex flex-col space-y-12 lg:space-y-42">

      <div>
        <Hero />
      </div>

      <div>
        <div className='flex w-full items-center justify-between text-white'>
          <h2 className='text-white text-lg sm:text-2xl lg:text-4xl'>Projects</h2>
          <span className="text-sm">More +500</span>
        </div>

        <div className="-m-2 sm:-mx-8 lg:-mx-40">
          <HomeCarousel />
        </div>
      </div>

      <div>
        <Services />
      </div>
      
      <Experience />

      <div className="-mt-20">
        <ImageCard />
      </div>

      <Clients />
      <CaseStudyCarousel />
      <ContactForm />
    </div>
  )
}

export default Home;
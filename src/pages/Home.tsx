import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import Services from "../components/layout/home/Services";
import Experience from "../components/layout/home/Experience";
import { HomeCarousel } from "../components/ui/home-carousel";
import { FeaturedImage } from "../components/ui/featured-image";
import { ContactForm } from "../components/pages/forms/contact";
import { Clients } from "../components/layout/home/Clients";
import Hero from "../components/ui/hero";


function Home() {
  return (
    <div className="w-full overflow-x-hidden px-2 lg:px-25 flex flex-col space-y-12 lg:space-y-42">

      <div>
        <Hero
          isHome
          title={
            <>
              <span className="block">We Create</span>
              <span className="block tracking-[4.5]">Campaigns&nbsp;That</span>
              <span className="block">Matter.</span>
            </>
          }
          description="Located in Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands."
        />
      </div>

      <div>
        <div className='flex w-full items-center justify-between text-white'>
          <h2 className='text-white text-lg sm:text-2xl lg:text-3xl py-2 font-bold'>Projects</h2>
          <span className="text-md">More +500</span>
        </div>

        <div className="-m-2 sm:-mx-8 lg:-mx-40">
          <HomeCarousel />
        </div>
      </div>

      <div>
        <Services />
      </div>

      <Experience />

      <div className="mt-20 mb-30">
        <FeaturedImage section = "home_bottom" />
      </div>

      <Clients />
      <CaseStudyCarousel />
      <ContactForm />
    </div>
  )
}

export default Home;
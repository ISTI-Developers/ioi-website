import Hero from "../components/ui/hero";
import CareerList from "../components/layout/career/CareerList";
import { FeaturedImage } from "../components/ui/featured-image";
import { Clients } from "../components/layout/home/Clients";



function Careers() {
    return (
        <div className="w-full text-white overflow-x-hidden px-6 md:px-12 lg:px-24 flex flex-col space-y-20">

            <Hero
                title={<>/Explore Exciting Opportunities</>}
                description="We believe in fostering a dynamic and collaborative work environment that empowers our team to create digital excellence."
            />

       
            <CareerList />


            <FeaturedImage />


            <Clients/>


        </div>
    )
}


export default Careers;
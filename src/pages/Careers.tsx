import Hero from "../components/ui/hero";
import CareerList from "../components/layout/career/CareerList";
import { FeaturedImage } from "../components/ui/featured-image";
import { Clients } from "../components/layout/home/Clients";



function Careers() {
    return (
        <div className="w-full text-white overflow-x-hidden px-6 md:px-12 lg:px-24 flex flex-col space-y-20">
            <img src="/careers.gif" alt="Career Gif" className="w-250 mx-auto block mt-15" />

            <CareerList />
        </div>
    )
}


export default Careers;
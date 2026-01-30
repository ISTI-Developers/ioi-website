import TeamMembers from "../components/layout/about-us/TeamMember";
import Hero from "../components/ui/hero";
import { Clients } from "../components/layout/home/Clients";
import Experience from "../components/layout/home/Experience";
import { FeaturedImage } from "../components/ui/featured-image";
import { ContactForm } from "../components/pages/forms/contact";


function About() {
    return (
        <div className="w-full overflow-x-hidden px-2 lg:px-25 flex flex-col space-y-12 lg:space-y-42">

            <Hero
                title={<>/About us</>}
                description="Located in Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands."
            />

            <FeaturedImage />

            <Experience />

            <Clients />
          
            <TeamMembers />

            <ContactForm />
        </div>
    )
}


export default About;
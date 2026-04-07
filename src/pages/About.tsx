import TeamMembers from "../components/layout/about/TeamMember";
import Hero from "../components/ui/hero";
import { Clients } from "../components/layout/home/Clients";
import Experience from "../components/layout/home/Experience";
import { FeaturedImage } from "../components/ui/featured-image";
import { ContactForm } from "../components/pages/forms/contact";


function About() {
    return (
<<<<<<< Updated upstream
        <div className="w-full overflow-x-hidden px-4 md:px-10 lg:px-20 flex flex-col space-y-10 md:space-y-16 lg:space-y-24">

           <img src="/abouts.gif" alt="About us Gif" className="w-250 mx-auto block mt-15" />

=======
        <div className="w-full overflow-x-hidden px-4 md:px-10 lg:px-20 flex flex-col">
            <Hero
                title={<>/About us</>}
            />
>>>>>>> Stashed changes

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start p-8">

                {/* Left: Company description */}
                <div className="space-y-4">
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 text-justify">
                        <span
                            className="text-2xl md:text-4xl lg:text-6xl font-extrabold"
                            style={{ color: "#C8391A" }}
                        >
                            InnovationOne Inc.{" "}
                        </span>
                        Operating right out of Makati, we’re a digital marketing agency that takes your brand’s online growth
                        as seriously as we take securing a table in Poblacion on a payday Friday. We navigate the wild,
                        ever-changing algorithms of the internet with the exact same street-smarts required to survive
                        rush hour on Edsa—fast, strategic, and occasionally relying on sheer willpower.

                        Forget the tired corporate jargon and copy-paste campaigns; we’re a heavily caffeinated crew of
                        data nerds and creatives who specialize in stopping the doomscroll and making your audience actually
                        pay attention. We turn clicks into clients, likes into loyalty, and your marketing budget into the
                        smartest investment you’ve made since deciding to carry an emergency umbrella in July.

                    </p>
                </div>

                {/* Right: Team photo */}
                <div className="max-w-[900px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                    <FeaturedImage section="about_top"/>
                </div>

            </section>

                    <TeamMembers />

            {/* 
            <Experience />

            <Clients />
            */}

            {/*
            <ContactForm />
            */}
        </div>
    )
}


export default About;
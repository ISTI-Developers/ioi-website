
export default function CareerList() {

    const jobs = [
        {
            title: "Media & Insights Analyst",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },
        {
            title: "Strategic Planning Executive",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },
        {
            title: "Media & Insights Lead",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },
        {
            title: "Sales Executive",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },

        {
            title: "Digital Ad Media Specialist ",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },

        {
            title: "Multimedia Artist",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },
        {
            title: "Jr Multimedia Artist",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },
        {
            title: "Jr Content Producer",
            department: "Business Development",
            location: "Onsite",
            type: "Fulltime"
        },





    ];


    return (
        <div className="w-full mb-100">
            <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between lg:items-end text-white mb-25">
                <h1 className="text-4xl lg:text-8xl">
                    Explore Exciting Opportunities
                </h1>
                <p className="w-100 sm:max-w-sm md:max-w-md lg:max-w-lg text-sm text-lightgray sm:text-sm">
                    We believe in fostering a dynamic and collaborative work environment
                    that empowers our team to create digital excellence.
                </p>
            </div>
            <div className="text-white mb-10">
                <h2 className="text-2xl max-w-90 mb-3">
                    Current openings | Business Development
                </h2>
                <p className="text-lightgray  text-sm w-90">
                    If you think you might be a good fit for our team, we’d love to hear from you!
                </p>
            </div>

            <section className="text-white flex flex-col py-10 border-b border-white/50">
                <span className="block">01/ Onsite-Fulltime</span>

                <div className="flex items-center justify-between mt-2">
                    <h2 className="text-5xl">Media & Insights Analyst</h2>

                    <div className="flex gap-x-2 items-center">
                        <span className="uppercase text-xs">Explore</span>
                        <button className="border border-gray rounded-md py-1 px-2 text-sm">↗</button>
                    </div>
                </div>
            </section>
            <section className="text-white flex flex-col py-10 border-b border-white/50">
                <span className="block">01/ Onsite-Fulltime</span>
                
                <div className="flex items-center justify-between mt-2">
                    <h2 className="text-5xl">Media & Insights Analyst</h2>

                    <div className="flex gap-x-2 items-center">
                        <span className="uppercase text-xs">Explore</span>
                        <button className="border border-gray rounded-md py-1 px-2 text-sm">↗</button>
                    </div>
                </div>
            </section>
            <section className="text-white flex flex-col py-10 border-b border-white/50">
                <span className="block">01/ Onsite-Fulltime</span>
                
                <div className="flex items-center justify-between mt-2">
                    <h2 className="text-5xl">Media & Insights Analyst</h2>

                    <div className="flex gap-x-2 items-center">
                        <span className="uppercase text-xs">Explore</span>
                        <button className="border border-gray rounded-md py-1 px-2 text-sm">↗</button>
                    </div>
                </div>
            </section>



        </div>
    );
};
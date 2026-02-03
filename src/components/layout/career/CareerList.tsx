import SectionHeader from "../headers/SectionHeader";




export default function CareerList() {

    const jobData = {
        "Business Development": [
            { title: "Media & Insights Analyst", location: "Onsite", type: "Fulltime" },
            { title: "Strategic Planning Executive", location: "Onsite", type: "Fulltime" },
            { title: "Media & Insights Lead", location: "Onsite", type: "Fulltime" },
            { title: "Sales Executive", location: "Onsite", type: "Fulltime" },
        ],
        "Account Management": [
            { title: "Digital Ad Media Specialist", location: "Onsite", type: "Fulltime" },
            { title: "Multimedia Artist", location: "Onsite", type: "Fulltime" },
        ],
        "Creative Team": [
            { title: "Jr Multimedia Artist", location: "Onsite", type: "Fulltime" },
            { title: "Jr Content Producer", location: "Onsite", type: "Fulltime" },
        ],
    };

    return (
        <div className="w-full">

            {Object.entries(jobData).map(([department, jobs]) => (
                <div key={department} className="mb-20">

                    <SectionHeader
                        category={department}
                        description="If you think you might be a good fit for our team, we’d love to hear from you!"
                    />

                    {jobs.map((job, index) => (
                        <section key={index} className="text-white flex flex-col py-10 border-b border-white/50">
                            <span className="block">{job.location} – {job.type}</span>

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-15  mt-2">
                                <h2 className="text-5xl">{job.title}</h2>

                                <div className="flex flex-row items-center lg:items-center gap-y-2 gap-x-4 lg:shrink-0">
                                    <span className="uppercase text-md tracking-widest">Explore</span>
                                    <button className="border border-white/50 rounded-md py-2 px-3 text-lg leading-none">↗</button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            ))}
        </div>
    );
};
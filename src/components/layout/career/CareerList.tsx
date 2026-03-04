import SectionHeader from "../headers/SectionHeader";
import { useCareers } from "@/hooks/useCareer";

export default function CareerList() {
    const { data, isLoading } = useCareers();

    const careers = Array.isArray(data) ? data : [];

    const groupedByDepartment = careers
        .filter((c) => c.is_active)
        .reduce((acc, career) => {
            if (!acc[career.department]) {
                acc[career.department] = [];
            }
            acc[career.department].push(career);
            return acc;
        }, {} as Record<string, typeof careers>);

    if (isLoading) {
        return <div className="text-white text-center py-20">Loading careers...</div>;
    }

    if (Object.keys(groupedByDepartment).length === 0) {
        return <div className="text-white text-center py-20">No open positions at the moment.</div>;
    }

    return (
        <div className="w-full">
            {Object.entries(groupedByDepartment).map(([department, jobs], index) => (
                <div key={department} className="mb-20">
                    <SectionHeader
                        category={department}
                        description="If you think you might be a good fit for our team, we'd love to hear from you!"
                        noMarginTop={index === 0}
                    />

                    {jobs.map((job, index) => (
                        <section key={job.career_id} className="text-white flex flex-col py-16 border-b border-white/50">
                            <span className="block">
                                <span className="text-primary mr-2">
                                    {(index + 1).toString().padStart(2, "0")} /
                                </span>
                                {job.work_setup} – {job.employment_type}
                            </span>

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-15 mt-2">
                                <h2 className="text-5xl">{job.career_title}</h2>

                                <div className="flex flex-row items-center lg:items-center gap-y-2 gap-x-4 lg:shrink-0">
                                    <span className="uppercase text-md tracking-widest">Explore</span>
                                        <a
                                        href={job.application_link ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-white/50 rounded-md py-2 px-3 text-lg leading-none hover:bg-white hover:text-black"
                                    >
                                        ↗
                                    </a>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            ))}
        </div>
    );
}
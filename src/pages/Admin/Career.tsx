import CareerDataTable from "@/components/pages/careers/CareersDataTable";
import { useCareers } from "@/hooks/useCareer";
import type { Career } from "@/data/career_columns";

export default function CareerPage() {
    const { data, isLoading } = useCareers();

    const backendCareers = Array.isArray(data) ? data : [];

    const careers: Career[] = backendCareers.map((c) => {
        return {
            career_id: c.career_id,
            career_title: c.career_title,
            department: c.department,
            work_setup: c.work_setup,
            employment_type: c.employment_type,
            description: c.description,
            is_active: c.is_active,
            application_link: c.application_link,
        };
    });

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Career Management</h1>
                <CareerDataTable careers={careers} />
            </div>
        </div>
    );
}
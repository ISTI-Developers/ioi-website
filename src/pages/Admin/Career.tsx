import {  useState } from "react";
import CareerDataTable from "@/components/pages/careers/CareersDataTable";
import { useCareers, useDeleteCareer } from "@/hooks/useCareer";
import type { Career } from "@/data/career_columns";

export default function CareerPage() {
    const { data, isLoading } = useCareers();
    const {mutate: deleteCareer } = useDeleteCareer();

    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const backendCareers = Array.isArray(data) ? data : [];

    const careers: Career[] = backendCareers.map((c: Career) => ({
        career_id: c.career_id,
        career_title: c.career_title,
        department: c.department,
        work_setup: c.work_setup,
        employment_type: c.employment_type,
        description: c.description,
        is_active: c.is_active,
        application_link: c.application_link,
    }));

    const handleEdit = (career: Career) => {
        setSelectedCareer(career);
        setIsEditOpen(true);
    };
    const handleDelete = (career: Career) => {
        if (!confirm(`Are you sure you want to delete "${career.career_title}"?`)) return;
        deleteCareer(career.career_id!);
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Career Management</h1>
                <CareerDataTable
                    careers={careers}
                    onEdit={handleEdit}         
                    onDelete={handleDelete}     
                    isEditOpen={isEditOpen}     
                    setIsEditOpen={setIsEditOpen} 
                    selectedCareer={selectedCareer} 
                    setSelectedCareer={setSelectedCareer} 
                />
            </div>
        </div>
    );
}
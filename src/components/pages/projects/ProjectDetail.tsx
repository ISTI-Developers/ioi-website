import { useState } from "react";
import Gallery from "./projectdetails/Gallery";
import Bullet from "./projectdetails/Bullet";
import type { Project } from "@/data/project_columns";
import type { Tab } from "@/data/types";
import DisplayTabsByStatus from "@/components/layout/DisplayTabs";

interface ProjectDetailProps {
    project: Project;
    onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
    const [selectedStatus, setSelectedStatus] = useState<string>("bullet");

    const tabs: Tab[] = [
        { value: "bullet", label: "Bullet" },
        { value: "gallery", label: "Gallery" },
    ];



    return (
        <div>
            <button
                className="mb-4 text-sm text-gray-600 underline"
                onClick={onBack}
            >
                Back
            </button>

            <h1>{project.project_name}</h1>

            <DisplayTabsByStatus
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                tabs={tabs}
            >

                <div>
                    {selectedStatus === "bullet" && <Bullet />}
                    {selectedStatus === "gallery" && <Gallery />}

                </div>

            </DisplayTabsByStatus>





        </div>

    );

}


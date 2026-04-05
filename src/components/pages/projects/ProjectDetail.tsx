import { useState } from "react";
import type { Project } from "@/data/project_columns";
import type { Tab } from "@/data/types";
import Bullet from "./projectdetails/Bullet";
import Gallery from "./projectdetails/Gallery";
import Prose from "./projectdetails/Prose";

import Video from "./projectdetails/Video";
import DisplayTabsByStatus from "@/components/layout/DisplayTabs";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("bullet");

  const tabs: Tab[] = [
    { value: "bullet", label: "Bullet" },
    { value: "prose", label: "Prose" },
    { value: "gallery", label: "Gallery" },
    { value: "videos", label: "Videos" },
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
          {selectedStatus === "bullet" && project.project_id && (
            <Bullet projectId={project.project_id} />
          )}

          {selectedStatus === "gallery" && project.project_id && (
            <Gallery projectId={project.project_id} />
          )}

          {selectedStatus === "prose" && project.project_id && (
            <Prose projectId={project.project_id} />
          )}

          {selectedStatus === "videos" && project.project_id && (
            <Video projectId={project.project_id} />
          )}
        </div>
      </DisplayTabsByStatus>
    </div>
  );
}
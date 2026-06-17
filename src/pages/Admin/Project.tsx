import ProjectDataTable from "@/components/pages/projects/ProjectDataTable";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/data/project_columns";

export default function ProjectPage() {
  const { data: backendProjects = [], isLoading } = useProjects();

const projects: Project[] = backendProjects.map((p) => ({
  project_id: p.project_id ?? 0,
  project_name: p.project_name ?? "",
  start_date: p.start_date ?? "",
  end_date: p.end_date ?? "",
  project_type: p.project_type ?? "",
  project_category: p.project_category ?? "",
  company_description: p.company_description ?? "",
  brand_positioning: p.brand_positioning ?? "",
  file: p.file ?? "",
}));

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading projects...</p>;
  }

  return (
    <div className="p-6">
      <div className="space-y-10">
        <h1 className="text-3xl font-semibold">
          Project Display Management
        </h1>

        <ProjectDataTable projects={projects} />
      </div>
    </div>
  );
}
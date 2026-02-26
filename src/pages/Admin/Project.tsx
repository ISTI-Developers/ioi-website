import ProjectDataTable from "@/components/pages/projects/ProjectDataTable";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/data/project_columns";


export default function ProjectPage() {
  const { data: backendProjects = [], isLoading } = useProjects();


 const projects: Project[] = backendProjects.map((p) => {

    return {
      project_id: p.project_id,
      project_name: p.project_name,
      description: p.company_description,
      start_date: p.start_date,
      end_date: p.end_date,
      project_type: p.project_type,
      project_category: p.project_category,
      company_description: p.company_description,
      brand_positioning: p.brand_positioning,
    };
  });
    
    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Project Display Management</h1>
                <ProjectDataTable projects={projects}/>
            </div>
        </div>
    );
}
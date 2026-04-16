import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import ProjectDetail from "./ProjectDetail";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Project } from "@/data/project_columns";
import ProjectForm from "../forms/create/ProjectForm";
import { useProjectColumns, def_project_columns, project_filters } from "@/data/project_columns";
import FormSheet from "@/components/layout/FormSheet";
import UpdateProjectForm from "../forms/update/UpdateProjectForm";

interface ProjectDataTableProps {
  projects: Project[];
}


export default function ProjectDataTable({ projects }: ProjectDataTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

 const columns = useProjectColumns(
  (project) => {
    setEditProject(project);
    setOpen(true);
  },
  undefined,
  (project) => setSelectedProject(project)
);

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "team-column-visibility",
    columns,
    def_project_columns
  );

  const dynamicDefaultColumns = useMemo(() => def_project_columns, []);
  const filterable = useMemo(() => project_filters, []);

  return (
    <>
      {!selectedProject ? (

        <DataTable
          columns={columns}
          data={projects}
          defaultVisibleColumns={dynamicDefaultColumns}
          filterableColumns={filterable}
          type="Project"
          form={<ProjectForm />}

          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      ) : (
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      )

      }
      {editProject && (
        <FormSheet
            open={open}
  onOpenChange={setOpen}
          type="Project"
          taskName="Update"
          form={<UpdateProjectForm 
          project={editProject} 
          onSuccess={() => setOpen(false)}/>}
        />
      )}

    </>
  );
}


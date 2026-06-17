import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import ProjectDetail from "./ProjectDetail";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Project } from "@/data/project_columns";
import ProjectForm from "../forms/create/ProjectForm";
import {
  useProjectColumns,
  def_project_columns,
  project_filters,
} from "@/data/project_columns";
import { useDeleteProject } from "@/hooks/useProjects";
import FormSheet from "@/components/layout/FormSheet";
import UpdateProjectForm from "../forms/update/UpdateProjectForm";
import DeleteDialog from "@/components/layout/DeleteDialog";

interface ProjectDataTableProps {
  projects: Project[];
}

export default function ProjectDataTable({ projects }: ProjectDataTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  // ✅ FIX: only 2 callbacks (edit + delete)
  const columns = useProjectColumns(
    (project) => {
      setEditProject(project);
      setOpen(true);
    },
    (project) => {
      setProjectToDelete(project);
      setOpenDelete(true);
    }
  );

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "project-column-visibility",
    columns,
    def_project_columns
  );

  const filterable = project_filters;
  const dynamicDefaultColumns = def_project_columns;

  const handleDelete = () => {
    if (!projectToDelete?.project_id) return;

    deleteProject(projectToDelete.project_id, {
      onSuccess: () => {
        setProjectToDelete(null);
        setOpenDelete(false);
      },
    });
  };

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
      )}

      {editProject && (
        <FormSheet
          open={open}
          onOpenChange={setOpen}
          type="Project"
          taskName="Update"
          form={
            <UpdateProjectForm
              project={editProject}
              onSuccess={() => setOpen(false)}
            />
          }
        />
      )}

      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        handleConfirm={handleDelete}
        loading={isDeleting}
      />
    </>
  );
}
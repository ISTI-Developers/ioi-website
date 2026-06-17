import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import FormSheet from "@/components/layout/FormSheet";
import UpdateProjectForm from "@/components/pages/forms/update/UpdateProjectForm";
import { EllipsisMenu } from "@/components/ui/ellipsis-menu";

export type Project = {
  project_id?: number;
  project_name: string;
  start_date: string;
  end_date?: string;
  project_type: string;
  project_category: string;
  company_description: string;
  brand_positioning: string;
};

export function useProjectColumns(
  onDelete?: (row: Project) => void,
  onProjectClick?: (row: Project) => void,
): ColumnDef<Project>[] {
  return [
    {
      accessorKey: "project_name",
      header: "Project Name",
      cell: ({ row }) => (
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => onProjectClick?.(row.original)}
        >
          {row.original.project_name}
        </button>
      ),
    },
    {
      accessorKey: "project_type",
      header: "Project Type",
    },
    {
      accessorKey: "project_category",
      header: "Project Category",
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
    },
    {
      accessorKey: "end_date",
      header: "End Date",
      cell: ({ row }) => {
        const endDate = row.original.end_date;
        return endDate ? endDate : "Ongoing";
      },
    },

    // {
    //     accessorKey: "company_description",
    //     header: "Company Description",
    //     cell: ({row}) => (
    //         <div className="max-w-xs truncate" title={row.original.company_description}>
    //             {row.original.company_description}
    //         </div>
    //     )
    // },
    // {
    //     accessorKey: "brand_positioning",
    //     header: "Brand Positioning",
    //     cell: ({row}) => (
    //         <div className="max-w-xs truncate" title={row.original.brand_positioning}>
    //             {row.original.brand_positioning}
    //         </div>
    //     )
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;
        const [open, setOpen] = useState(false);
        return (
          <>
            <EllipsisMenu
              items={[
                {
                  label: "Edit",
                  onClick: () => setOpen(true),
                },
                {
                  label: "Delete",
                  onClick: () => onDelete?.(project),
                  variant: "destructive",
                },
              ]}
            />

            <FormSheet
              open={open}
              onOpenChange={setOpen}
              type="Project"
              taskName="Update Project"
              form={
                <UpdateProjectForm
                  project={project}
                  onSuccess={() => setOpen(false)}
                />
              }
            />
          </>
        );
      },
    },
  ];
}

export const def_project_columns = [
  "project_name",
  "project_type",
  "project_category",
  "company_description",
  "brand_positioning",
  "actions",
];

export const project_filters = ["project_type"];

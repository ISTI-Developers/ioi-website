import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";


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
    onEdit?: (row: Project) => void,
    onDelete?: (row: Project) => void

): ColumnDef<Project>[] {
    return [
        {
            accessorKey: "project_name",
            header: "Project Name",
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
        },

        {
            accessorKey: "company_description",
            header: "Company Description",
            cell: ({row}) => (
                <div className="max-w-xs truncate" title={row.original.company_description}>
                    {row.original.company_description}
                </div>
            )
        },
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
        const team = row.original;

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-0">
              <Command>
                <CommandGroup>
                  <CommandItem onSelect={() => onEdit?.(team)}>Edit</CommandItem>
                  <CommandItem onSelect={() => onDelete?.(team)}>Delete</CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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

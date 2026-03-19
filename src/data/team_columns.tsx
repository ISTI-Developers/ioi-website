import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import ImageDialog from "@/components/ui/image-dialog";

export type Team = {
  team_id?: number;
  employee_id: number;
  first_name: string;
  last_name: string;
  position: string;
  is_mancomm?: number
  quote?: string;
  role_id?:number;
  role_name?: string;
  file?: string[];
};

export function useTeamColumns(
  onEdit?: (row: Team) => void,
  onDelete?: (row: Team) => void
): ColumnDef<Team>[] {
  return [
    {
      accessorKey: "file",
      header: "Image",
      cell: ({ row }) => {
        const file = row.original.file; 
        const fullName = `${row.original.first_name} ${row.original.last_name}`;
    
        if (!file) {
          return (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
              N/A
            </div>
          );
        }
    
        return (
          <ImageDialog
            title={fullName}
            images={file} 
            baseUrl=""
            triggerClassName="w-10 h-10 object-cover rounded-sm cursor-pointer"
          />
        );
      },
    },
    {
      accessorKey: "employee_id",
      header: "Employee ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "role_name",
      header: "Role",
    },
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

export const def_team_columns = [
  "file",
  "employee_id",
  "first_name",
  "last_name",
  "position",
  "role",
  "quote",
  "actions",
];

export const team_filters = ["position"];
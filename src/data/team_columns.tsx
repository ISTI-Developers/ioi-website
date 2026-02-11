import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CircleX, Edit, Trash2 } from "lucide-react";

export type Team = {
  team_id?: number;
  employee_id: number;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  alias?: string | null;
  position: string;
  quote?: string | null;
  file?: string[];
};

export function useTeamColumns(
  onEdit?: (row: Team) => void,
  onDelete?: (row: Team) => void
): ColumnDef<Team>[] {
  return [
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
      accessorKey: "middle_name",
      header: "Middle Name",
    },
    {
      accessorKey: "alias",
      header: "Alias",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "quote",
      header: "Quote",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const team = row.original;
        return (
          <div className="flex gap-2">
            <button
              className="p-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
              onClick={() => onEdit?.(team)}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
              onClick={() => onDelete?.(team)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];
}

export const def_team_columns = [
  "employee_id",
  "first_name",
  "last_name",
  "middle_name",
  "alias",
  "position",
  "quote",
  "actions", 
];

export const team_filters = ["position", "alias"];

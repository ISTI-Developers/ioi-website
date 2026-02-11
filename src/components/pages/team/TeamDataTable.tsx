import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Team } from "@/data/team_columns";
import { useTeamColumns, def_team_columns, team_filters } from "@/data/team_columns";

interface TeamDataTableProps {
  teams: Team[];
}

export default function TeamDataTable({ teams }: TeamDataTableProps) {
  const columns = useTeamColumns();

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "team-column-visibility",
    columns,
    def_team_columns
  );

  const dynamicDefaultColumns = useMemo(() => def_team_columns, []);
  const filterable = useMemo(() => team_filters, []);

  return (
    <DataTable
      columns={columns}
      data={teams}
      defaultVisibleColumns={dynamicDefaultColumns}
      filterableColumns={filterable}
      type="Team"
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}

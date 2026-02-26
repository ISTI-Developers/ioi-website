import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Project } from "@/data/project_columns";
import { useProjectColumns, def_project_columns, project_filters } from "@/data/project_columns";


interface ProjectDataTableProps {
    projects: Project[];
}


export default function ProjectDataTable({ projects }: ProjectDataTableProps) {
     const columns = useProjectColumns();
    
      const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "team-column-visibility",
        columns,
        def_project_columns
      );
    
      const dynamicDefaultColumns = useMemo(() => def_project_columns, []);
      const filterable = useMemo(() => project_filters, []);
    
    return(
        <DataTable
          columns={columns}
          data={projects}
          defaultVisibleColumns={dynamicDefaultColumns}
          filterableColumns={filterable}
          type="Project"
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
    );
}


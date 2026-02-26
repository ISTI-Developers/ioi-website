import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Career } from "@/data/career_columns";
import CareerForm from "../forms/create/CareerForm";
import { useCareerColumns, def_career_columns, career_filters } from "@/data/career_columns";

interface CareerDataTableProps {
  careers: Career[];
}

export default function CareerDataTable({ careers }: CareerDataTableProps) {
  const columns = useCareerColumns();

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "career-column-visibility",
    columns,
    def_career_columns
  );

  const dynamicDefaultColumns = useMemo(() => def_career_columns, []);
  const filterable = useMemo(() => career_filters, []);

  return (
    <DataTable
      columns={columns}
      data={careers}
      defaultVisibleColumns={dynamicDefaultColumns}
      filterableColumns={filterable}
      type="Career"
      form={<CareerForm />}
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
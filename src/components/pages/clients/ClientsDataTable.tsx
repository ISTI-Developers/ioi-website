import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Client } from "@/data/client_columns";
import ClientForm from "../forms/create/ClientForm";
import { useClientColumns, def_client_columns, client_filters } from "@/data/client_columns";


interface ClientDataTableProps {
    clients: Client[];
}

export default function ClientDataTable({ clients }: ClientDataTableProps) {
    const columns = useClientColumns();


    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "client-column-visibility",
        columns,
        def_client_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_client_columns, []);
    const filterable = useMemo(() => client_filters, []);

     return (
    <DataTable
      columns={columns}
      data={clients}
      defaultVisibleColumns={dynamicDefaultColumns}
      filterableColumns={filterable}
      type="Client"
      form={<ClientForm />}

      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}

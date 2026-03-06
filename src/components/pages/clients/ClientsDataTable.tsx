import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Client } from "@/data/client_columns";
import ClientForm from "../forms/create/ClientForm";
import { useClientColumns, def_client_columns, client_filters } from "@/data/client_columns";
import FormSheet from "@/components/layout/FormSheet";

interface ClientDataTableProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
    isEditOpen: boolean;
    setIsEditOpen: (open: boolean) => void;
    selectedClient: Client | null;
    setSelectedClient: (client: Client | null) => void;
}

export default function ClientDataTable({
    clients,
    onEdit,
    onDelete,
    isEditOpen,
    setIsEditOpen,
    selectedClient,
    setSelectedClient,
}: ClientDataTableProps) {
    const columns = useClientColumns(onEdit, onDelete);

    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "client-column-visibility",
        columns,
        def_client_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_client_columns, []);
    const filterable = useMemo(() => client_filters, []);

    return (
        <>
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

            <FormSheet
                type="Client"
                taskName="Edit"
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setSelectedClient(null);
                }}
                form={
                    selectedClient ? (
                        <ClientForm  // ← was BannerForm, fixed
                            existing={selectedClient}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedClient(null);
                            }}
                        />
                    ) : <></>
                }
            />
        </>
    );
}
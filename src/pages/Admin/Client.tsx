import { useState } from "react";
import ClientDataTable from "@/components/pages/clients/ClientsDataTable";
import { useClients, useDeleteClient } from "@/hooks/useClients";
import type { Client } from "@/data/client_columns";

export default function ClientPage() {
    const { data: backendClients = [], isLoading } = useClients();
    const { mutate: deleteClient } = useDeleteClient();

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const clients: Client[] = (backendClients as Client[]).map((c) => ({
        client_id: c.client_id,
        client_name: c.client_name,
        client_description: c.client_description,
        file: c.file,
    }));

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setIsEditOpen(true);
    };

    const handleDelete = (client: Client) => {
        if (!confirm(`Are you sure you want to delete "${client.client_name}"?`)) return;
        deleteClient({ id: client.client_id!, fileUrl: client.file });
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Client Management</h1>
                <ClientDataTable
                    clients={clients}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                />
            </div>
        </div>
    );
}
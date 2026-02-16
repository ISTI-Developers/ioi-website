import ClientDataTable from "@/components/pages/clients/ClientsDataTable";
import { useClients } from "@/hooks/useClients";
import type { Client } from "@/data/client_columns";


export default function ClientPage() {
    const { data: backendClients = [], isLoading } = useClients();


    const clients: Client[] = backendClients.map((c) => {


        return {
            client_id: c.client_id,
            client_name: c.client_name,
            client_description: c.client_description,

        };
    });
    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Client Management</h1>
                <ClientDataTable clients={clients} />
            </div>

        </div>
    )


}

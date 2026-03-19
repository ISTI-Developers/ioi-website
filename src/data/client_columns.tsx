import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command,CommandGroup,CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";


export type Client = {
    client_id?: number;
    client_name: string;
    client_description: string;
    file?: string;
};


export function useClientColumns(
    onEdit?: (row: Client) => void,
    onDelete?: (row: Client) => void
): ColumnDef<Client>[] {
    return [
        {
            accessorKey: "file",
            header: "Image",
            cell: ({ row }) => {
                const file = row.original.file;
                return file ? (
                    <img
                        src={file}
                        alt={`${row.original.client_name} logo`}
                        className="w-16 h-10 rounded-md  object-cover"
                    />
                ) : (
                    <div className="w-16 h-10 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        N/A
                    </div>
                );
            },
        },
        {
            accessorKey: "client_name",
            header: "Client Name",
        },
        {
            accessorKey: "client_description",
            header: "Client Description",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const client = row.original;

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
                                    <CommandItem onSelect={() => onEdit?.(client)}>Edit</CommandItem>
                                    <CommandItem onSelect={() => onDelete?.(client)}>Delete</CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                );
            },
        },
    ];
}

export const def_client_columns = [
  "file",
  "client_name",
  "client_description",
  "actions",
];

export const client_filters = ["client_name"];
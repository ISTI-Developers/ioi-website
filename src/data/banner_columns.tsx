import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export type Banner = {
    banner_id?: number;
    section: string;
    file?: string;
    year: string;
    text: string;
};

export function useBannerColumns(
    onEdit?: (row: Banner) => void,
    onDelete?: (row: Banner) => void
): ColumnDef<Banner>[] {
    return [
        {
            accessorKey: "section",
            header: "Section",
        },
        {
            accessorKey: "year",
            header: "Year",
        },
        {
            accessorKey: "text",
            header: "Text",
        },
        
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const banner = row.original;
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
                                    <CommandItem onSelect={() => onEdit?.(banner)}>Edit</CommandItem>
                                    <CommandItem onSelect={() => onDelete?.(banner)}>Delete</CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                );
            },
        },
    ];
}

export const def_banner_columns = [
    "section",
    "year",
    "text",
    "file",
    "actions",
];

export const banner_filters = ["section"];
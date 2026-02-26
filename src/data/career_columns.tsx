import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Career = {
    career_id?: number;
    career_title: string;
    department: string;
    work_setup: string;
    employment_type: string;
    description: string;
    is_active: number;
    application_link?: string;
};

export function useCareerColumns(
    onEdit?: (row: Career) => void,
    onDelete?: (row: Career) => void
): ColumnDef<Career>[] {
    return [
        {
            accessorKey: "career_title",
            header: "Career Title",
        },
        {
            accessorKey: "department",
            header: "Department",
        },
        {
            accessorKey: "work_setup",
            header: "Work Setup",
        },
        {
            accessorKey: "employment_type",
            header: "Employment Type",
        },
        {
            accessorKey: "is_active",
            header: "Status",
            cell: ({ row }) => {
                const isActive = row.original.is_active;
                return (
                    <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Inactive"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "application_link",
            header: "Application Link",
            cell: ({ row }) => {
                const link = row.original.application_link;
                return link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline truncate max-w-[200px] block"
                    >
                        {link}
                    </a>
                ) : (
                    <span className="text-muted-foreground">—</span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const career = row.original;

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
                                    <CommandItem onSelect={() => onEdit?.(career)}>Edit</CommandItem>
                                    <CommandItem onSelect={() => onDelete?.(career)}>Delete</CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                );
            },
        },
    ];
}

export const def_career_columns = [
    "career_title",
    "department",
    "work_setup",
    "employment_type",
    "is_active",
    "application_link",
    "actions",
];

export const career_filters = ["department", "employment_type"];
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";


interface MenuItem {
    label: string;
    onClick: () => void;
    variant?: "defualt" | "destructive";
}


interface EllipsisMenuProps {
    items: MenuItem[];
    hoverable?: boolean;
}


export function EllipsisMenu({ items, hoverable }: EllipsisMenuProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                variant="outline" 
                size="icon"
                className={hoverable ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}
                >
                    <EllipsisVertical className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-0">
                <Command>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                key={item.label}
                                onSelect={item.onClick}
                                className={item.variant === "destructive" ? "text-destructive " : ""}
                            >
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>

    )
}


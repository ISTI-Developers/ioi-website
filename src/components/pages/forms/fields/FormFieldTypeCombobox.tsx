import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";

/**
 * Temporary type fix (REMOVE this once you fix "@/data/types")
 */
export type Asset_Type = {
  type_id: number;
  type_name: string;
  category_id: number;
  sub_category_id: number;
  category_name: string;
  sub_category_name: string;
};

interface FormFieldTypeComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  assetTypes: Asset_Type[];
  form: any;
}

function FormFieldTypeCombobox({
  control,
  name,
  label,
  assetTypes,
  form,
}: FormFieldTypeComboboxProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedType = assetTypes.find(
          (type) => type.type_id === field.value
        );

        return (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <IconComponent className="h-4 w-4" />
              {label}
            </FormLabel>

            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between w-full h-auto min-h-10 px-3 py-2",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <div className="flex-1 text-left">
                      {selectedType ? (
                        <span className="text-sm">
                          {selectedType.category_name} /{" "}
                          {selectedType.sub_category_name} /{" "}
                          {selectedType.type_name}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Select type
                        </span>
                      )}
                    </div>

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 flex-shrink:0" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="width: var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search type..." className="h-9" />

                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>

                      <CommandGroup>
                        {assetTypes
                          .filter((type) => type.type_name)
                          .sort((a, b) =>
                            a.type_name.localeCompare(b.type_name)
                          )
                          .map((type) => (
                            <CommandItem
                              key={type.type_id}
                              value={type.type_name}
                              onSelect={() => {
                                form.setValue("type_id", type.type_id);
                                form.setValue("sub_category_id", type.sub_category_id);
                                form.setValue("category_id", type.category_id);
                              }}
                              className="cursor-pointer"
                            >
                              <div className="flex-1 text-sm">
                                {type.category_name} /{" "}
                                {type.sub_category_name} /{" "}
                                {type.type_name}
                              </div>

                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  type.type_id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FormFieldTypeCombobox;

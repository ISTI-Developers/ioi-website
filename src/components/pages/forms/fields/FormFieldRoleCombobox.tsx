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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Control } from "react-hook-form";

interface Role {
  role_id: number;
  role_name: string;
}

interface FormFieldRoleComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  roles: Role[];
}

function FormFieldRoleCombobox({
  control,
  name,
  label,
  roles,
}: FormFieldRoleComboboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedRole = field.value
          ? roles.find((role) => role.role_id === field.value)
          : null;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between w-full min-h-[2.5rem] px-3 py-2",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <span className="flex-1 text-left">
                      {selectedRole ? selectedRole.role_name : "Select Role"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search role..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((role) => (
                          <CommandItem
                            key={role.role_id}
                            value={role.role_name}
                            onSelect={() => {
                              field.onChange(role.role_id);
                            }}
                          >
                            <span className="flex-1">{role.role_name}</span>
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                role.role_id === field.value ? "opacity-100" : "opacity-0"
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

export default FormFieldRoleCombobox;

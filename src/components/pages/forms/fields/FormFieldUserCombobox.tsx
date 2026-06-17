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
type Employee = {
  user_id: number;
  name: string;
  company_id: number;
  department_id?: number | null;
  unit_id?: number | null;
};
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { Control } from "react-hook-form";

interface FormFieldUserComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  employees: Employee[];
  form: any;
}

function FormFieldUserCombobox({
  control,
  name,
  label,
  employees,
  form,
}: FormFieldUserComboboxProps) {
  const IconComponent = getColumnIcon(name);

  const [displayedEmployees, setDisplayedEmployees] =
    useState<Employee[]>(employees);

  useEffect(() => {
    setDisplayedEmployees(employees);
  }, [employees]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedEmployee = employees.find(
          (e) => e.user_id === field.value,
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
                      "justify-between w-full h-auto  px-3 py-2",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {selectedEmployee ? (
                      <span className="text-sm">{selectedEmployee.name}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        Select Employee
                      </span>
                    )}

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Employee..."
                      className="h-9"
                    />

                    <CommandList>
                      <CommandEmpty>No employee found.</CommandEmpty>

                      <CommandGroup>
                        {/* ❌ OrgFilter removed (add back only if file exists) */}

                        {displayedEmployees
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((employee) => (
                            <CommandItem
                              key={employee.user_id}
                              value={employee.name}
                              onSelect={() => {
                                field.onChange(employee.user_id);

                                form.setValue(
                                  "company_id",
                                  employee.company_id,
                                  { shouldValidate: true },
                                );

                                if (employee.department_id) {
                                  form.setValue(
                                    "department_id",
                                    employee.department_id,
                                    { shouldValidate: true },
                                  );
                                }
                              }}
                            >
                              <span className="flex-1 text-sm">
                                {employee.name}
                              </span>

                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  employee.user_id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
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

export default FormFieldUserCombobox;

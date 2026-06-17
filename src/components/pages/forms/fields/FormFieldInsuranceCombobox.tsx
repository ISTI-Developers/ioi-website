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

export type Insurance = {
  insurance_id: number;
  insurance_name: string;
  insurance_date_to?: string | Date | null;
};

interface FormFieldInsuranceComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  insurances: Insurance[];
  form: any;
}

function FormFieldInsuranceCombobox({
  control,
  name,
  label,
  insurances,
  form,
}: FormFieldInsuranceComboboxProps) {
  const IconComponent = getColumnIcon(name);

  const nonExpiredInsurances =
    insurances?.filter((insurance) => {
      const dateTo = insurance.insurance_date_to;
      if (!dateTo) return true;

      const dt = dateTo instanceof Date ? dateTo : new Date(dateTo);
      return !isNaN(dt.getTime()) && dt.getTime() >= Date.now();
    }) ?? [];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>

          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between w-full",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? insurances.find(
                        (insurance) => insurance.insurance_id === field.value,
                      )?.insurance_name
                    : "Select insurance provider"}

                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w- [300px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search insurance..."
                    className="h-9"
                  />

                  <CommandList>
                    <CommandEmpty className="flex justify-center p-4 text-sm text-muted-foreground">
                      No insurance found
                    </CommandEmpty>

                    <CommandGroup>
                      {nonExpiredInsurances.map((insurance) => (
                        <CommandItem
                          key={insurance.insurance_id}
                          value={insurance.insurance_name}
                          onSelect={() => {
                            form.setValue(
                              "insurance_id",
                              insurance.insurance_id,
                              { shouldValidate: true },
                            );
                          }}
                        >
                          {insurance.insurance_name}

                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              insurance.insurance_id === field.value
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
      )}
    />
  );
}

export default FormFieldInsuranceCombobox;


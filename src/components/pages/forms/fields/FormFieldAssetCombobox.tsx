import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
// import DisplayAsset from "@/components/ui/display-asset";
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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";

interface Asset {
  asset_id: number;
  asset_name: string;
  category_id: number;
  sub_category_id: number;
  type_id: number;
}

interface FormFieldAssetComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  assets: Asset[];
  form: any;
}

function FormFieldAssetCombobox({
  control,
  name,
  label,
  assets,
  form,
}: FormFieldAssetComboboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // const selectedAsset = field.value
        //   ? assets.find((asset) => asset.asset_id === field.value)
        //   : null;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between w-full",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {/* {selectedAsset ? (
                      // <DisplayAsset
                        asset_name={selectedAsset.asset_name}
                        category={String(selectedAsset.category_id)}
                        sub_category={String(selectedAsset.sub_category_id)}
                        type={String(selectedAsset.type_id)}
                      />
                    ) : (
                      <span>Select Asset</span>
                    )} */}

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search asset..." />
                    <CommandList>
                      <CommandEmpty>No asset found.</CommandEmpty>

                      <CommandGroup>
                        {assets
                          .sort((a, b) =>
                            a.asset_name.localeCompare(b.asset_name)
                          )
                          .map((asset) => (
                            <CommandItem
                              key={asset.asset_id}
                              value={asset.asset_name}
                              onSelect={() => {
                                field.onChange(asset.asset_id);

                                form.setValue("type_id", asset.type_id, {
                                  shouldValidate: true,
                                });
                                form.setValue(
                                  "sub_category_id",
                                  asset.sub_category_id,
                                  { shouldValidate: true }
                                );
                                form.setValue(
                                  "category_id",
                                  asset.category_id,
                                  { shouldValidate: true }
                                );
                              }}
                            >
                              <span className="flex-1">
                                {asset.asset_name}
                              </span>

                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  asset.asset_id === field.value
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

export default FormFieldAssetCombobox;

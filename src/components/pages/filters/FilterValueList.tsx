import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";

interface FilterValueListProps {
  data: any[];
  selectedColumn: string;
  setCurrentScreen: (type: string) => void;
  onFiltersChange?: (columnName: string, values: string[]) => void;
  teamId: number;
}

function FilterValueList({
  data,
  selectedColumn,
  setCurrentScreen,
  onFiltersChange,
  teamId,
}: FilterValueListProps) {
  // Using your centralized team lookup
  const {
    getTeamMemberName,
  } = useLookupFunctions(teamId);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [amountMin, setAmountMin] = useState<string>("");
  const [amountMax, setAmountMax] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Get unique values for this column
  const getUniqueValues = (columnName: string) => {
    if (!data || data.length === 0) return [];

    // For now, if the column is "team_id", use the lookup
    if (columnName === "team_id") {
      const ids = data
        .map((row) => row[columnName])
        .filter((v) => v != null)
        .filter((v, i, arr) => arr.indexOf(v) === i);

      return ids.map((id) => getTeamMemberName(id));
    }

    // Fallback: just show raw unique values
    return Array.from(new Set(data.map((row) => row[columnName]))).map(String);
  };

  const isAmountColumn =
    selectedColumn && String(selectedColumn).toLowerCase().includes("amount");
  const isDateColumn =
    selectedColumn && String(selectedColumn).toLowerCase().includes("date");

  const handleApply = () => {
    if (!onFiltersChange) return;

    if (isAmountColumn) {
      onFiltersChange(selectedColumn, [amountMin ?? "", amountMax ?? ""]);
      setAmountMin("");
      setAmountMax("");
    } else if (isDateColumn) {
      onFiltersChange(selectedColumn, [dateFrom, dateTo]);
      setDateFrom("");
      setDateTo("");
    } else {
      onFiltersChange(selectedColumn, selectedFilters);
      setSelectedFilters([]);
    }

    setCurrentScreen("columns");
  };

  const amountValid = amountMin !== "" || amountMax !== "";
  const dateValid = dateFrom !== "" && dateTo !== "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between opacity-60">
        <p className="font-semibold">{selectedColumn} is</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setCurrentScreen("columns");
            setSelectedFilters([]);
            setAmountMin("");
            setAmountMax("");
            setDateFrom("");
            setDateTo("");
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {isAmountColumn ? (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Enter amount range</div>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min"
              value={amountMin}
              onChange={(e) => setAmountMin(e.currentTarget.value)}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={amountMax}
              onChange={(e) => setAmountMax(e.currentTarget.value)}
              className="w-32"
            />
          </div>
        </div>
      ) : isDateColumn ? (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Select date range</div>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.currentTarget.value)}
              className="w-40"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.currentTarget.value)}
              className="w-40"
            />
          </div>
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto space-y-1">
          {getUniqueValues(selectedColumn).map((value, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 py-1.5 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-150"
            >
              <Checkbox
                id={`filter-${selectedColumn}-${index}`}
                checked={selectedFilters.includes(value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFilters((prev) =>
                      prev.includes(value) ? prev : [...prev, value]
                    );
                  } else {
                    setSelectedFilters((prev) =>
                      prev.filter((item) => item !== value)
                    );
                  }
                }}
              />
              <Label
                htmlFor={`filter-${selectedColumn}-${index}`}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {value}
              </Label>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={handleApply}
        disabled={
          isAmountColumn ? !amountValid : isDateColumn ? !dateValid : selectedFilters.length === 0
        }
        variant={
          isAmountColumn
            ? amountValid
              ? "default"
              : "outline"
            : isDateColumn
            ? dateValid
              ? "default"
              : "outline"
            : selectedFilters.length === 0
            ? "outline"
            : "default"
        }
      >
        {isAmountColumn
          ? amountValid
            ? <>
                <Plus /> Apply range
              </>
            : "Enter range"
          : isDateColumn
          ? dateValid
            ? <>
                <Plus /> Apply range
              </>
            : "Select dates"
          : selectedFilters.length === 0
          ? "Select filters"
          : <>
              <Plus /> Apply {selectedFilters.length} filter{selectedFilters.length > 1 ? "s" : ""}
            </>}
      </Button>
    </div>
  );
}

export default FilterValueList;

import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Career } from "@/data/career_columns";
import CareerForm from "../forms/create/CareerForm";
import { useCareerColumns, def_career_columns, career_filters } from "@/data/career_columns";
import FormSheet from "@/components/layout/FormSheet";

interface CareerDataTableProps {
    careers: Career[];
    onEdit: (career: Career) => void;
    onDelete: (career: Career) => void;
    isEditOpen: boolean;
    setIsEditOpen: (open: boolean) => void;
    selectedCareer: Career | null;
    setSelectedCareer: (career: Career | null) => void;
}

export default function CareerDataTable({
    careers,
    onEdit,
    onDelete,
    isEditOpen,
    setIsEditOpen,
    selectedCareer,
    setSelectedCareer,
}: CareerDataTableProps) {
    const columns = useCareerColumns(onEdit, onDelete);

    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "career-column-visibility",
        columns,
        def_career_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_career_columns, []);
    const filterable = useMemo(() => career_filters, []);

    return (
        <>
            <DataTable
                columns={columns}
                data={careers}
                defaultVisibleColumns={dynamicDefaultColumns}
                filterableColumns={filterable}
                type="Career"
                form={<CareerForm />}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
            />

            <FormSheet
                type="Career"
                taskName="Edit"
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setSelectedCareer(null);
                }}
                form={
                    selectedCareer ? (
                        <CareerForm
                            existing={selectedCareer}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedCareer(null);
                            }}
                        />
                    ) : <></>
                }
            />
        </>
    );
}
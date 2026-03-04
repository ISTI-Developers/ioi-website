import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Banner } from "@/data/banner_columns";
import BannerForm from "../forms/create/BannerForm";
import { useBannerColumns, def_banner_columns, banner_filters } from "@/data/banner_columns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BannerDataTableProps {
    banners: Banner[];
    onEdit: (banner: Banner) => void;
    onDelete: (banner: Banner) => void;
    isEditOpen: boolean;
    setIsEditOpen: (open: boolean) => void;
    selectedBanner: Banner | null;
    setSelectedBanner: (banner: Banner | null) => void;
}

export default function BannerDataTable({
    banners,
    onEdit,
    onDelete,
    isEditOpen,
    setIsEditOpen,
    selectedBanner,
    setSelectedBanner,
}: BannerDataTableProps) {
    const columns = useBannerColumns(onEdit, onDelete);

    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "banner-column-visibility",
        columns,
        def_banner_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_banner_columns, []);
    const filterable = useMemo(() => banner_filters, []);

    return (
        <>
            <DataTable
                columns={columns}
                data={banners}
                defaultVisibleColumns={dynamicDefaultColumns}
                filterableColumns={filterable}
                type="Banner"
                form={<BannerForm />}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
            />

            <Dialog open={isEditOpen} onOpenChange={(open) => {
                setIsEditOpen(open);
                if (!open) setSelectedBanner(null);
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Banner</DialogTitle>
                    </DialogHeader>
                    {selectedBanner && (
                        <BannerForm
                            existing={selectedBanner}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedBanner(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
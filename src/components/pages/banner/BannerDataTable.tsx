import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Banner } from "@/data/banner_columns";
import BannerForm from "../forms/create/BannerForm";
import { useBannerColumns, def_banner_columns, banner_filters } from "@/data/banner_columns";

interface BannerDataTableProps {
    banners: Banner[];
}

export default function BannerDataTable({ banners }: BannerDataTableProps) {
    const columns = useBannerColumns();

    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "banner-column-visibility",
        columns,
        def_banner_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_banner_columns, []);
    const filterable = useMemo(() => banner_filters, []);

    return (
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
    );
}
import { useState } from "react";
import BannerDataTable from "@/components/pages/banner/BannerDataTable";
import { useBanners, useDeleteBanner } from "@/hooks/useBanner";
import type { Banner } from "@/data/banner_columns";

export default function BannerPage() {
    const { data, isLoading } = useBanners();
    const { mutate: deleteBanner } = useDeleteBanner();

    const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const backendBanners = Array.isArray(data) ? data : [];

    const banners: Banner[] = backendBanners.map((b: Banner) => ({
        banner_id: b.banner_id,
        section: b.section,
        file: b.file,
        year: b.year,
        text: b.text,
    }));

    const handleEdit = (banner: Banner) => {
        setSelectedBanner(banner);
        setIsEditOpen(true);
    };

    const handleDelete = (banner: Banner) => {
        if (!confirm(`Are you sure you want to delete this banner?`)) return;
        deleteBanner({ id: banner.banner_id!, fileUrl: banner.file });
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Banner Management</h1>
                <BannerDataTable
                    banners={banners}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    selectedBanner={selectedBanner}
                    setSelectedBanner={setSelectedBanner}
                />
            </div>
        </div>
    );
}
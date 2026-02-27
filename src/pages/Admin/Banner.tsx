import BannerDataTable from "@/components/pages/banner/BannerDataTable";
import { useBanners } from "@/hooks/useBanner";
import type { Banner } from "@/data/banner_columns";

export default function BannerPage() {
    const {data, isLoading} = useBanners();

    const backendBanners = Array.isArray(data) ? data : [];

    const banners: Banner[] = backendBanners.map((b) => {
        return {
            banner_id: b.banner_id,
            section: b.section,
            file: b.file,
            year: b.year,
            text: b.text,
        };
    });

    if (isLoading) return <div className="p-6">Loading...</div>;

    return(
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Banner Management</h1>
                <BannerDataTable banners={banners} />
            </div>
        </div>
    )
}
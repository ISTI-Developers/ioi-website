import { useBanners } from "@/hooks/useBanner";

interface FeaturedImageProps {
  section: string;
  imgClassName?: string;
}

export function FeaturedImage({ section, imgClassName = "" }: FeaturedImageProps) {
  const { data, isLoading } = useBanners();
  const banners = Array.isArray(data) ? data : [];
  const banner = banners.find((b) => b.section === section);

  if (isLoading)
    return (
      <div className="w-full rounded-3xl bg-gray-800 animate-pulse" />
    );


  if (!banner) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
        <img
          src={banner.file} 
          alt="Banner"
          className={`w-full h-full object-cover rounded-3xl ${imgClassName}`}
        />
        <div className="absolute inset-0 lg:flex justify-between p-14 text-white hidden">
          <span className="text-md">{banner.year}</span>
          <span className="text-md">{banner.text}</span>
        </div>
    </div>
  );
}
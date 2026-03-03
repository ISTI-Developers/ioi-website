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
      <div className="h-auto w-full flex items-center justify-center">
        <div className="w-full lg:max-w-7xl h-112.5 lg:h-auto lg:aspect-video rounded-3xl bg-gray-800 animate-pulse" />
      </div>
    );

  if (!banner) return null;

  return (
    <div className="h-auto w-full flex items-center justify-center">
      <div className="relative w-full h-112.5 lg:h-auto overflow-hidden">
        <img
          src={banner.file} 
          alt="Banner"
          className={`w-full object-cover rounded-3xl ${imgClassName}`}
        />
        <div className="absolute inset-0 lg:flex justify-between p-14 text-white hidden">
          <span className="text-md">{banner.year}</span>
          <span className="text-md">{banner.text}</span>
        </div>
      </div>
    </div>
  );
}
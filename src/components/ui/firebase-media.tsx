import { useImageUrl } from "@/hooks/useImageUrl";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";


interface FirebaseMediaProps {
    path?: string;
    alt?: string;
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
}


export default function FirebaseMedia ({ 
    path,
    alt = "Media",
    className = "",
    autoplay = false,
    loop = false,
    muted = false,
}: FirebaseMediaProps) {
    const { url, loading, error } = useImageUrl(path);


    if(!path) return null;


    if (loading) {
        return <Skeleton className={cn("w-full h-100 rounded-lg", className)} />;
    }

    if(error || !url) {
        return (
            <div className={`bg-gray-100 text-gray-400 flex items-center justify-center rounded-lg ${className}`}>
                Media  not available
            </div>
        );
    }

    const ext = path.split(".").pop()?.toLowerCase();
    const isVideo = ext === "mp4" || ext ==="webm" || ext === "mov";


    if(isVideo) {
        return (
            <video
            src={url}
            className={`object-cover ${className}`}
            controls
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            playsInline
            />
        )
    }





    return (
        <img
            src={url}
            alt={alt}
            className={`object-cover ${className}`}

        />

    )
}
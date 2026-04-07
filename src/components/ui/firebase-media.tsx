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
    onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;

}


export default function FirebaseMedia({
    path,
    alt = "Media",
    className = "",
    autoplay = false,
    loop = false,
    muted = false,
    onLoadedMetadata,

}: FirebaseMediaProps) {
    const { url, loading, error } = useImageUrl(path);
    console.log({ path, url, loading, error });


    if (!path) return null;


    if (loading) {
        return <Skeleton className={cn("w-full h-100 rounded-lg", className)} />;
    }

    if (error || !url) {
        return <Skeleton className={cn("w-full h-100 rounded-lg", className)} />;
    }

    const ext = path.split("?")[0].split(".").pop()?.toLowerCase();
    const isVideo = ext === "mp4" || ext === "webm" || ext === "mov";


    if (isVideo) {
        return (
            <video
                src={url}
                className={`object-cover ${className}`}
                controls
                autoPlay={autoplay}
                loop={loop}
                muted={true}
                onLoadedMetadata={onLoadedMetadata}
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
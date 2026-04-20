import { useImageUrl } from "@/hooks/useImageUrl";
import { Skeleton } from "./skeleton";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import GlassIconButton from "./button-glass";

interface FirebaseMediaProps {
    path?: string;
    alt?: string;
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    isActive?: boolean;
    onActivate?: () => void;
    onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    actions?: React.ReactNode;

}


export default function FirebaseMedia({
    path,
    alt = "Media",
    className = "",
    autoplay = false,
    loop = false,
    muted = false,
    isActive = false,
    onActivate,
    onLoadedMetadata,
    actions,

}: FirebaseMediaProps) {
    const { url, loading, error } = useImageUrl(path);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoplay);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isActive) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                onActivate?.();
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };




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
            <div className={cn("relative group overflow-hidden", className)}>
                <video
                    ref={videoRef}
                    src={url}
                    className={`object-cover ${className}`}
                    autoPlay={false}
                    loop={loop}
                    muted={muted}
                    onLoadedMetadata={onLoadedMetadata}
                    playsInline
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">

                        <GlassIconButton onClick={togglePlay}>
                            {isPlaying ? (
                                <Pause className="w-6 h-6 fill-white" />
                            ) : (
                                <Play className="w-6 h-6 fill-white" />
                            )}
                        </GlassIconButton>

                        {actions && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-3"
                            >
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        );
    }





    return (
        <img
            src={url}
            alt={alt}
            className={`object-cover ${className}`}

        />

    )
}
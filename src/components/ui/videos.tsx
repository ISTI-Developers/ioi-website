import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import FirebaseMedia from "./firebase-media";

interface Video {
    video_id?: number;
    file: string;
}

interface VideoCarouselProps {
    videos: Video[];
    height?: string;
    renderActions?: (video: Video) => React.ReactNode;
}

export default function VideoCarousel({ videos, height = "120", renderActions }: VideoCarouselProps) {

    const [ratios, setRatios] = useState<Record<number, boolean>>({});
    const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

    const handleMetadata = (videoId: number | undefined, e: React.SyntheticEvent<HTMLVideoElement>) => {
        if (!videoId) return;
        const vid = e.currentTarget;
        const isPortrait = vid.videoHeight > vid.videoWidth;
        setRatios(prev => ({ ...prev, [videoId]: isPortrait }));
    };



    return (
        <Carousel className="w-full relative">
            <CarouselContent>
                {videos.map((video) => {
                    const isPortrait = video.video_id !== undefined && ratios[video.video_id!];
                    return (
                        <CarouselItem
                            key={video.video_id}
                            className={
                                isPortrait
                                    ? "basis-full sm:basis-1/2 md:basis-1/3"
                                    : "basis-full"
                            }
                        >
                            <FirebaseMedia
                                path={video.file}
                                className={`w-full rounded-md object-contain bg-black ${height}`}
                                onLoadedMetadata={(e) => handleMetadata(video.video_id, e)}
                                isActive={activeVideoId === video.video_id}
                                onActivate={() => video.video_id && setActiveVideoId(video.video_id)}
                                actions={renderActions?.(video)}
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            {videos.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 " />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                </>
            )}
        </Carousel>
    );
}
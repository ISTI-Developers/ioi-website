import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import VideoForm from "../../forms/create/VideoForm";
import FirebaseMedia from "@/components/ui/firebase-media";

import { useVideo } from "@/hooks/useVideo";
import { Plus } from "lucide-react";


interface VideosProps {
    projectId: number;
    onSuccess?: () => void;
}

export default function Videos({ projectId, onSuccess }: VideosProps) {
    const [ratios, setRatios] = useState<Record<number, boolean>>({});

    const { data, isLoading } = useVideo(projectId);
    const videos = data?.video ?? [];

    if (isLoading) return <div>Loading...</div>;


    const handleMetadata = (videoId: number | undefined, e: React.SyntheticEvent<HTMLVideoElement>) => {
        if (videoId === undefined) return;
        const el = e.currentTarget;
        setRatios(prev => ({ ...prev, [videoId]: el.videoHeight > el.videoWidth }));
    };


    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <FormSheet
                    type="Video"
                    taskName="Add a New"
                    button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
                    form={<VideoForm projectId={projectId} onSuccess={onSuccess} />}
                />
            </div>

            <Carousel className="w-full px-10">
                <CarouselContent>
                    {videos.map((video) => {
                        const isPortrait = video.video_id !== undefined && ratios[video.video_id];
                        return (
                            <CarouselItem
                                key={video.video_id}
                                className={isPortrait ? "basis-1/3" : "basis-full"}
                            >
                                <div>
                                    <FirebaseMedia
                                        path={video.file}
                                        className={`w-full rounded-md object-contain bg-black h-150`}
                                        onLoadedMetadata={(e) => handleMetadata(video.video_id, e)}
                                    />
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import FirebaseMedia from "@/components/ui/firebase-media";
import { useVideo } from "@/hooks/useVideo";
import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import VideoForm from "../../forms/create/VideoForm";
import { Plus } from "lucide-react";


interface Video {
    video_id?: number;
    file: string;
}




interface VideoProps {
    projectId: number
    height?: string;
    showAdd?: boolean;
    onSuccess?: () => void;


}


export default function Video({ projectId, height = "120", showAdd = true, onSuccess }: VideoProps) {
    const [ratios, setRatios] = useState<Record<number, boolean>>({});

    const { data: videoData, isLoading } = useVideo(projectId);
    const videos = videoData?.video ?? [];

    if (isLoading) return <div>Loading...</div>;




    const handleMetadata = (videoId: number | undefined, e: React.SyntheticEvent<HTMLVideoElement>) => {
        if (!videoId) return;
        const vid = e.currentTarget;
        const isPortratit = vid.videoHeight > vid.videoWidth;
        setRatios(prev => ({ ...prev, [videoId]: isPortratit }));
    };


    return (
        <div className="space-y-4">

            {showAdd && (
                <div className="flex justify-end">
                    <FormSheet
                        type="Video"
                        taskName="Add a New"
                        button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
                        form={<VideoForm projectId={projectId} onSuccess={onSuccess} />}
                    />
                </div>
            )}

            <Carousel className="w-full">
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
                                        className={`w-full rounded-md object-contain bg-black ${height}`}
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
    )


}


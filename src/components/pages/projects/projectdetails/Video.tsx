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
    const { data, isLoading } = useVideo(projectId);
    const videos = data?.video ?? [];

    if (isLoading) return <div>Loading...</div>;

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

            <Carousel className="w-full">
                <CarouselContent>
                    {videos.map((video) => (
                        <CarouselItem key={video.video_id} className="basis-full">
                            <div className="p-1">
                                <video
                                    src={video.file}
                                    controls
                                    className="w-full rounded-md aspect-video"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
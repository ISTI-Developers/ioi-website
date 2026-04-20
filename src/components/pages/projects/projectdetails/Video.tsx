import { useState } from "react";

import { useVideo, useDeleteVideo } from "@/hooks/useVideo";
import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import { SheetTrigger } from "@/components/ui/sheet";
import { SquarePen, Trash2 } from "lucide-react";

import VideoForm from "../../forms/create/VideoForm";
import VideoCarousel from "@/components/ui/videos";
import { useMe } from "@/hooks/useAuth";
import GlassIconButton from "@/components/ui/button-glass";
import { Plus } from "lucide-react";

import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";
import DeleteDialog from "@/components/layout/DeleteDialog";

interface VideoProps {
    projectId: number;
    height?: string;
    showAdd?: boolean;
    onSuccess?: () => void;
}

export default function Video({ projectId, height = "120", showAdd = true, onSuccess }: VideoProps) {
    const { data: auth } = useMe();
    const isAdmin = auth?.user?.role === "admin";

    const { data: videoData, isLoading } = useVideo(projectId);
    const videos = videoData?.video ?? [];

    const { mutate: deleteVideo } = useDeleteVideo();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteFile, setDeleteFile] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);


    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            if (deleteFile) {
                const fileRef = ref(storage, deleteFile);
                await deleteObject(fileRef).catch(() => {
                    console.warn("File already deleted or not found");
                });
            }

            deleteVideo(deleteId, {
                onSuccess: () => {
                    onSuccess?.();

                    setOpenDelete(false);
                    setDeleteId(null);
                    setDeleteFile(null);
                },
            });
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            {showAdd && isAdmin && (
                <div className="flex justify-end">
                    <FormSheet
                        type="Video"
                        taskName="Add a New"
                        button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
                        form={<VideoForm projectId={projectId} onSuccess={onSuccess} />}
                    />
                </div>
            )}

            <VideoCarousel
                videos={videos}
                height={height}
                renderActions={isAdmin ? (video) => (
                    <>
                        <FormSheet
                            type="Video"
                            taskName="Update"
                            button={
                                <SheetTrigger>
                                    <GlassIconButton>
                                        <SquarePen />
                                    </GlassIconButton>
                                </SheetTrigger>
                            }
                            form={
                                <VideoForm
                                    projectId={projectId}
                                    videoId={video.video_id}
                                    defaultFile={video.file ?? undefined}
                                    onSuccess={onSuccess}
                                />
                            }
                        />
                        <GlassIconButton
                            onClick={() => {
                                setDeleteId(video.video_id ?? null);
                                setDeleteFile(video.file ?? null);
                                setOpenDelete(true);
                            }}
                        >
                            <Trash2 />
                        </GlassIconButton>
                    </>
                ) : undefined}
            />

            <DeleteDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                handleConfirm={handleDelete}
            />
        </div>
    );
}
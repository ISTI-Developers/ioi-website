import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import ImageCarousel from "./image-carousel";
import { useState } from "react";

interface ImageDialogProps {
  title: string;
  images: string[];
  baseUrl?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  triggerClassName?: string;
}

function ImageDialog({
  title,
  images,
  baseUrl = import.meta.env.VITE_SERVER,
  cancelLabel = "Cancel",
  confirmLabel = "Continue",
  onConfirm,
  onCancel,
  triggerClassName = "max-w-20",
}: ImageDialogProps) {
  const [displayImage, setDisplayImage] = useState<string>(images[0]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img
          className={triggerClassName}
          src={`${baseUrl}${images[0]}`}
          alt={title}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
          <img
            className="max-h-[200px]"
            src={`${baseUrl}${displayImage}`}
            alt={displayImage}
          />
        </div>

        {images.length > 1 && (
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-[300px]">
              <ImageCarousel images={images} setDisplayImage={setDisplayImage} />
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ImageDialog;
import { Plus } from "lucide-react";

interface UploadBoxProps {
    file?: File | null;
    onUpload: (file: File) => void;
}

export default function UploadBox({ file, onUpload }: UploadBoxProps) {
    const preview = file ? URL.createObjectURL(file) : null;

    return (
        <label className="w-full h-56 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer
        hover:border-gray-500 transition 
        ">

            {preview ? (
                <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover" />

            ) : (
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-gray-100  flex items-center justify-center  shadow-xl border border-gray-300 cursor-pointer transition-transform">
                        <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">Upload</p>
                </div>

            )}

            <input
                type="file"
                accept="images/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        onUpload(e.target.files[0])
                    }
                }}

            />



        </label>

    );
}
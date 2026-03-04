import { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";




export const useImageUrl = (path?: string) => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (!path) return;

    const fetchUrl = async () => {
      try {
        setLoading(true);
        const storageRef = ref(storage, path);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Fetched image URL:", downloadUrl);
        setUrl(downloadUrl);
      } catch (err) {
        console.error("Error getting image URL:", err);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [path]);

  return { url, loading, error };
};


export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (file: File, folder: string) => {
    setLoading(true);

    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);

    try {
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      setLoading(false);
      return url;
    } catch (err) {
      setLoading(false);
      console.log("Upload failed", err);
      return null;
    }
  };

  return { upload, loading };

}

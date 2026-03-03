import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // adjust path if needed

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
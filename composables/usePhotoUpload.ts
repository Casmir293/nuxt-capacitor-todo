import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function usePhotoUpload() {
  const { $supabase } = useNuxtApp() as { $supabase: SupabaseClient };
  const isNative = Capacitor.isNativePlatform();

  /** camera/gallery on native, file input on web */
  const pickOrUploadPhoto = async (event?: Event): Promise<string | null> => {
    try {
      if (isNative) {
        // native (capacitor camera)
        const photo = await Camera.getPhoto({
          quality: 80,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Prompt,
        });

        if (!photo.base64String) return null;
        const fileName = `task_${Date.now()}.jpg`;
        return await uploadPhotoBase64(photo.base64String, fileName);
      }

      // web (file input change event)
      if (event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          const fileName = `task_${Date.now()}_${file.name}`;
          return await uploadFile(file, fileName);
        }
      }

      return null;
    } catch (err: any) {
      logger("Photo upload failed:", err);
      alert(err.message);
      return null;
    }
  };

  /** upload base64 (supabase storage) */
  const uploadPhotoBase64 = async (base64: string, fileName: string): Promise<string | null> => {
    const { error } = await $supabase.storage.from("tasks-photos").upload(fileName, decodeBase64(base64), {
      contentType: "image/jpeg",
    });

    if (error) throw error;
    return getPublicUrl(fileName);
  };

  /** upload File object (supabase storage) */
  const uploadFile = async (file: File, fileName: string): Promise<string | null> => {
    const { error } = await $supabase.storage.from("tasks-photos").upload(fileName, file);
    if (error) throw error;
    return getPublicUrl(fileName);
  };

  /** get public url */
  const getPublicUrl = (fileName: string): string | null => {
    const { data } = $supabase.storage.from("tasks-photos").getPublicUrl(fileName);
    return data?.publicUrl ?? null;
  };

  /** helper: base64 (blob) */
  const decodeBase64 = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
    return new Blob([new Uint8Array(byteNumbers)], { type: "image/jpeg" });
  };

  return {
    pickOrUploadPhoto,
  };
}

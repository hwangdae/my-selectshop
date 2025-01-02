import supabase from "@/lib/supabaseClient";

const uploadReviewImages = async (fileName: string, file: File) => {
  await supabase.storage
    .from("images")
    .upload(`reviewImages/${fileName}`, file);
};

const uploadProfileImage = async (fileName: string, file: File) => {
  const { data } = await supabase.storage
    .from("images")
    .upload(`profileImages/${fileName}`, file);
  return data;
};

export { uploadReviewImages, uploadProfileImage };

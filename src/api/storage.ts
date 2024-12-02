import supabase from "@/lib/supabaseClient";

const uploadReviewImages = async (randomFileName: string, file: File) => {
  await supabase.storage
    .from("images")
    .upload(`reviewImages/${randomFileName}`, file);
};

const uploadProfileImage = async (
  uploadImage: string,
  uploadImageFile: File
) => {
  const { data } = await supabase.storage
    .from("images")
    .upload(`profileImages/${uploadImage}`, uploadImageFile);
  return data;
};

export { uploadReviewImages, uploadProfileImage };

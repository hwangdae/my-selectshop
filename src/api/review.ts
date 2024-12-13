import supabase from "@/lib/supabaseClient";
import {
  NewReviewType,
  ReviewType,
  UploadReviewType,
} from "@/types/reviewType";

const getAllReview = async () => {
  const { data } = await supabase.from("reviews").select("*");
  return data;
};

const getReview = async (id: string) => {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("selectshopId", id);
  return data;
};
const getMyReview = async (selectshopId: string, userId: string) => {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("selectshopId", selectshopId)
    .eq("userId", userId);
};
const getReviewAndUser = async (id: string) => {
  const { data } = await supabase
    .from("reviews")
    .select('*,users("*")')
    .eq("selectshopId", id);
  return data;
};
const getReviewCount = async (loginUser: string) => {
  const { count } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("userId", loginUser);
  return count;
};
const addReview = async (review: NewReviewType) => {
  const { error } = await supabase.from("reviews").insert(review);

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }
};
const deleteReview = async (
  userId: string,
  selectshopId: string | undefined
) => {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("userId", userId)
    .eq("selectshopId", selectshopId);
  if (error) {
    console.log("supabase delete error", error);
    throw new Error(error.message);
  }
};

const updateReview = async (review: NewReviewType) => {
  const { error } = await supabase.from("reviews").update(review).eq("id", review.id);
  if (error) {
    console.log("supabase delete error", error);
    throw new Error(error.message);
  }
};

export {
  getAllReview,
  getReview,
  getMyReview,
  getReviewAndUser,
  getReviewCount,
  addReview,
  deleteReview,
  updateReview,
};

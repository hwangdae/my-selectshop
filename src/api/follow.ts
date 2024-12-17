import supabase from "@/lib/supabaseClient";
import { FollowType } from "@/types/followType";

const getAllFollowList = async () => {
  const { data } = await supabase.from("follows").select("*");
  return data;
};

const followWhether = async (loginUser: string, id: string) => {
  const { data } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", loginUser)
    .eq("following_id", id);
  return data;
};

const userFollow = async (follow: FollowType) => {
  await supabase.from("follows").insert(follow);
};

const userUnfollow = async (loginUser: string, id: string) => {
  await supabase
    .from("follows")
    .delete()
    .eq("follower_id", loginUser)
    .eq("following_id", id);
};

const getFollowingUsers = async (userId:string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("users!inner(email)")
    .eq("follower_id", userId);

  if (error) {
    console.error("Error fetching following users:", error);
  }
  return data;
};
export { getAllFollowList, followWhether, userFollow, userUnfollow, getFollowingUsers };

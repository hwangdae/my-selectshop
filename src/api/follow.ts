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

const getFollowerUsers = async (loginUser: string) => {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select("users!follows_follower_id_fkey(*)")
      .eq("following_id", loginUser);
      if (error) {
        console.error("Supabase error:", error);
        return null;
      }
      const flattenedData = data?.map((data)=> data.users)
    return flattenedData;
  } catch (error) {
    console.error("Error fetching following users:", error);
  }
};

const getFollowingUsers = async (loginUser: string) => {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select("users!follows_following_id_fkey(*)")
      .eq("follower_id", loginUser);
      if (error) {
        console.error("Supabase error:", error);
        return null;
      }
      const flattenedData = data?.map((data)=> data.users)
    return flattenedData;
  } catch (error) {
    console.error("Error fetching following users:", error);
  }
};
export {
  getAllFollowList,
  followWhether,
  userFollow,
  userUnfollow,
  getFollowerUsers,
  getFollowingUsers,
};

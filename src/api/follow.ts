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

const userFollow = async (follow:FollowType) => {
  await supabase.from("follows").insert(follow);
}

const userUnfollow = async (loginUser:string,id:string) => {
  await supabase
  .from("follows")
  .delete()
  .eq("follower_id", loginUser)
  .eq("following_id", id);
}
export { getAllFollowList, followWhether ,userFollow, userUnfollow};

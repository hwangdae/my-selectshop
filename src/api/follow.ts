import supabase from "@/lib/supabaseClient";

const getFollowList = async () => {
  const { data } = await supabase.from("follows").select("*");
  return data;
};

export default { getFollowList };

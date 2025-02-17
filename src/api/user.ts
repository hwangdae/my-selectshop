import supabase from "@/lib/supabaseClient";
import { updateProfileType } from "@/types/authType";

const getUser = async (id: string) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};
const getUserWidthFollow = async (id: string) => {
  const { data } = await supabase
    .from("users")
    .select('*,follows("*")')
    .eq("id", id);
  return data;
};
const getAllUsers = async () => {
  try {
    const { data } = await supabase.from("users").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersAndReviewCount = async () => {
  try {
    const { data } = await supabase
      .from("users")
      .select('*,reviews("*")')
      .limit(10);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (email: string, password: string, nickName: string) => {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickName,
      },
    },
  });
};

const logOut = async () => {
  await supabase.auth.signOut();
};

const userProfileUpdate = async (
  updateProfile: updateProfileType,
  id: string
) => {
  try {
    await supabase.from("users").update(updateProfile).eq("id", id)
  } catch (error) {
    console.log(error);
  }
};

export {
  getUser,
  getAllUsers,
  signUp,
  logOut,
  userProfileUpdate,
  getAllUsersAndReviewCount,
  getUserWidthFollow,
};

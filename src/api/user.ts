import supabase from "@/lib/supabaseClient";

interface updateProfileType {
  profileImage : string | undefined;
  nickName : string;
}

const getUser = async (id: string) => {
  const { data: userLogin } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  return userLogin;
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

const userProfileUpdate = async (updateProfile:updateProfileType, id : string) => {
  await supabase
        .from("users")
        .update(updateProfile)
        .eq("id", id)
        .select();
};
export { getUser, signUp, userProfileUpdate };

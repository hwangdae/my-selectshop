import supabase from "@/lib/supabaseClient";

interface updateProfileType {
  profileImage: string | undefined;
  nickName: string;
}

const getUser = async (id: string) => {
  try {
    const { data: userLogin,error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
      if(error) throw error
    return userLogin;
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

const userProfileUpdate = async (
  updateProfile: updateProfileType,
  id: string
) => {
  await supabase.from("users").update(updateProfile).eq("id", id).select();
};
export { getUser, signUp, userProfileUpdate };

import supabase from "@/lib/supabaseClient";

const getUser = async (id: string) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};

const signUp = async (email: string, password: string, nickName: string) => {
  await await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickName,
      },
    },
  });
};
export { getUser, signUp };

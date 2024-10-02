import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "@/api/user";

const useUserMutate = () => {
  const queryClient = useQueryClient();

  const logOutMutate = useMutation({
    mutationFn: async () => {
      await logOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("로그아웃 중 에러 발생:", error);
    },
  });

  return { logOutMutate };
};

export default useUserMutate;

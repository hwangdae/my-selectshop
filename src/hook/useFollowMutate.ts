import { userFollow, userUnfollow } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollowMutate = (loginUser: string, id: string) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["follow"] });
  };

  const followMutate = useMutation({
    mutationFn: userFollow,
    onSuccess: success,
  });
  const unFollowMutate = useMutation({
    mutationFn: ()=>userUnfollow(loginUser,id),
    onSuccess : success
  })
  return { followMutate,unFollowMutate };
};

export default useFollowMutate;

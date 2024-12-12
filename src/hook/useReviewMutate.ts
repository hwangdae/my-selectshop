import { addReview, deleteReview, getReview } from "@/api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const useReviewMutate = (userId:string,selectshopId:string) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review", selectshopId] });
  };

  const addReviewMutate = useMutation({
    mutationFn: addReview,
    onSuccess: success,
  });

  const deleteReviewMutate = useMutation({
    mutationFn:()=>deleteReview(userId,selectshopId),
    onSuccess:success
  })
  return { addReviewMutate,deleteReviewMutate };
};

export default useReviewMutate;

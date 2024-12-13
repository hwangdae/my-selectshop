import { addReview, deleteReview, getReview, updateReview } from "@/api/review";
import { NewReviewType, ReviewType } from "@/types/reviewType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReviewMutate = (userId: string, selectshopId: string | undefined) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
  };


  const addReviewMutate = useMutation({
    mutationFn: addReview,
    onSuccess: success,
  });

  const deleteReviewMutate = useMutation({
    mutationFn: () => deleteReview(userId, selectshopId),
    onSuccess: success,
  });

  const updateReviewMutate = useMutation({
    mutationFn:updateReview,
    onSuccess: success,
  });
  return {
    addReviewMutate,
    deleteReviewMutate,
    updateReviewMutate,
  };
};

export default useReviewMutate;

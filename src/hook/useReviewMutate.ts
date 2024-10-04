import { addReview } from "@/api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReviewMutate = (selectshopId: string) => {
  const queryClient = useQueryClient();

  const reviewMutate = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", selectshopId] });
    },
  });
  return { reviewMutate };
};

export default useReviewMutate;

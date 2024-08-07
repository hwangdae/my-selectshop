import {
  addSelectShopBookmark,
  deleteSelectShopBookmark,
} from "@/api/selectShopBookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSelectShopBookmark = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selectShop_bookmark"] });
    },
  };

  const addSelectShopBookmarkMutate = useMutation(
    addSelectShopBookmark,
    success
  );
  const deleteSelectShopBookmarkMutate = useMutation(
    deleteSelectShopBookmark,
    success
  );
  
  return { addSelectShopBookmarkMutate, deleteSelectShopBookmarkMutate };
};

export default useSelectShopBookmark;

import { useQueryClient } from "@tanstack/react-query"

const useSelectShopBookmark = () => {
    const queryClient = useQueryClient();

    const success = {
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['selectShop_bookmark']})
        }
    }
}
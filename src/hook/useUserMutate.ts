import { getUser, userProfileUpdate } from "@/api/user";
import { updateProfileType, UserType } from "@/types/authType";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUserMutate = () => {
    const queryClient = useQueryClient();

    const success = () => {
        queryClient.invalidateQueries({queryKey:["user"]})
    }

    const confirmUpdateProfileButton = (url:string|undefined,user:UserType,nickName:string) => {
        const updateProfile:updateProfileType = {
            profileImage: url
              ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/profileImages/${url}`
              : user?.profileImage,
            nickName,
          };
        userMutate.mutate(updateProfile)
    }
    const userMutate = useMutation({
        mutationFn : userProfileUpdate,
        onSuccess : success
    })

    return {userMutate, confirmUpdateProfileButton}
}

export default useUserMutate
import { getUser, userProfileUpdate } from "@/api/user";
import { updateProfileType, UserType } from "@/types/authType";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUserMutate = (loginUser:string) => {
    const queryClient = useQueryClient();

    const success = () => {
        queryClient.invalidateQueries({queryKey:["user"]})
    }

    const userMutate = useMutation({
        mutationFn : ()=>getUser(loginUser),
        onSuccess : success
    })

    return {userMutate}
}

export default useUserMutate
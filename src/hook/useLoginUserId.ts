import { useEffect, useState } from "react"

const useLoginUserId = () => {
    const [loginUserId,setLoginUserId] = useState('')
    useEffect(()=>{
        const token = localStorage.getItem('sb-ueynqiqykmvvldjuwvmj-auth-token')
        if(token){
            const {user} = JSON.parse(token)
            setLoginUserId(user.id)
        }
    })
    return loginUserId
}

export default useLoginUserId
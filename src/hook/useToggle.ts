import { useState } from "react"

const useToggle = (initialState:boolean):[boolean,()=>void] => {
    const [toggle,setToggle] = useState<boolean>(initialState)

    const handleToggle = () => {
        setToggle(!toggle)
    }
    return [toggle,handleToggle]
}

export default useToggle
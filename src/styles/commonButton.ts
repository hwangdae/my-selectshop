import { Button } from "@mui/material";
import styled from "styled-components";

export const CommonButton = styled(Button)(()=>({
    padding : "12px 0px",
    backgroundColor : "red"
}))

// const CommonButton = ({type,color,children}:any) => {
//     return (<S.Button>{children}</S.Button>)
// }

// const S = {
//     Button : styled.button`

//     `
// }
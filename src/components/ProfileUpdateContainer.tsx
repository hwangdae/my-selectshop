import React, { useState } from "react";
import { ModalProps } from "./ModalMap";
import styled from "styled-components";
import { modal, modalContent } from "@/styles/modal";
import { styleFont } from "@/styles/styleFont";
import supabase from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";

const ProfileUpdateContainer = ({onClose}:ModalProps) => {
  const [uploadImgUrl, setUploadImgUrl] = useState<any>("");
  const [nickName,setNickName] = useState<string>("");

  const loginUser = useLoginUserId();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(loginUser),
  });


  console.log(user)
  const onchangeImageUpload = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onload = () => {
      setUploadImgUrl(reader.result);
    };
  };

  const logoutHandleSubmit = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const modalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget){
      onClose()
    }
  }
  
  return (
    <S.ProfileUpdateContainer onClick={modalClose}>
      <S.ProfileUpdateInner>
      <S.ProfileTitle>프로필 수정</S.ProfileTitle>
      <S.ProfileFormContainer>
        <img src={uploadImgUrl} />
        <S.ImageInput
          type="file"
          accept="image/*"
          onChange={onchangeImageUpload}
        ></S.ImageInput>
        <S.NickNameInput value={nickName} type="text" onChange={(e)=>setNickName(e.target.value)}></S.NickNameInput>
        <S.ProfileFn>
          <Button type="submit" variant="contained"
              sx={{ padding: "5px 30px" }}>수정</Button>
          <Button type="button" variant="contained"
              sx={{ padding: "5px 30px" }} onClick={logoutHandleSubmit}>로그아웃</Button>
        </S.ProfileFn>
      </S.ProfileFormContainer>
      </S.ProfileUpdateInner>
    </S.ProfileUpdateContainer>
  );
};

export default ProfileUpdateContainer;

const S = {
  ProfileUpdateContainer : styled(modal)``,
  ProfileUpdateInner : styled(modalContent)``,
  ProfileTitle : styled.h1`
    ${styleFont.textLarge}
  `,
  ProfileFormContainer : styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  `,
  ImageInput : styled.input``,
    NickNameInput : styled.input`
        width: 100%;
    padding: 12px 0px;
    margin-bottom: 7px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 3px;
    outline: none;
  `,
  ProfileFn : styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
  `
}

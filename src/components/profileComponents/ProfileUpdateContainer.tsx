import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { modal, modalContent } from "@/styles/modal";
import { styleFont } from "@/styles/styleFont";
import supabase from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import { getUser, userProfileUpdate } from "@/api/user";
import { ModalProps } from "../ModalMap";
import { updateProfileType } from "@/types/authType";
import LogoutButton from "../utilityComponents/LogoutButton";
import ImageUploadContainer from "./ImageUploadContainer";
import { useRouter } from "next/router";
import useUserMutate from "@/hook/useUserMutate";

const ProfileUpdateContainer = ({ onClose }: ModalProps) => {
  const [previewProfileImage, setPreviewProfileImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
  const [uploadImage, setUploadImage] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const loginUser = useLoginUserId();
  const router = useRouter()
  const {userMutate} = useUserMutate(loginUser)
  const { data: user } = useQuery({
    queryKey: ["user", loginUser],
    queryFn: () => getUser(loginUser),
    enabled: !!loginUser,
  });

  useEffect(() => {
    setPreviewProfileImage(user?.profileImage as string);
    setNickName(user?.nickName);
  }, [user]);


  const profileUpdateHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let url: string | undefined = "";
      if (uploadImageFile) {
        const { data } = await supabase.storage
          .from("images")
          .upload(`profileImages/${uploadImage}`, uploadImageFile);
        url = data?.path.split("/")[1];
      }
      const updateProfile: updateProfileType = {
        profileImage: url
          ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/profileImages/${url}`
          : user?.profileImage,
        nickName,
      };
      await userProfileUpdate(updateProfile, user?.id);
      userMutate.mutate()
      alert("프로필 수정이 완료 되었습니다.");
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  const modalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ProfileUpdateContainer onClick={modalClose}>
      <S.ProfileUpdateInner>
        <S.ProfileTitle>프로필 수정</S.ProfileTitle>
        <S.ProfileFormContainer onSubmit={profileUpdateHandle}>
          <S.ProfileContents>
            <ImageUploadContainer
              previewProfileImage={previewProfileImage}
              setPreviewProfileImage={setPreviewProfileImage}
              setUploadImageFile={setUploadImageFile}
              setUploadImage={setUploadImage}
            />
            <h1>{user?.email}</h1>
            <S.NickNameInput
              value={nickName || ""}
              type="text"
              onChange={(e) => setNickName(e.target.value)}
            />
          </S.ProfileContents>
          <S.ProfileFn>
            <Button type="submit">수정</Button>
            <LogoutButton />
          </S.ProfileFn>
        </S.ProfileFormContainer>
      </S.ProfileUpdateInner>
    </S.ProfileUpdateContainer>
  );
};

export default ProfileUpdateContainer;

const S = {
  ProfileUpdateContainer: styled(modal)``,
  ProfileUpdateInner: styled(modalContent)``,
  ProfileTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  ProfileFormContainer: styled.form`
    text-align: center;
  `,
  ProfileContents: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0px;
  `,
  NickNameInput: styled.input`
    width: 100%;
    padding: 12px 0px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 4px;
    outline: none;
    letter-spacing: -1px;
  `,
  ProfileFn: styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
  `,
};

import React, { useEffect, useState } from "react";
import { ModalProps } from "./ModalMap";
import styled from "styled-components";
import { modal, modalContent } from "@/styles/modal";
import { styleFont } from "@/styles/styleFont";
import supabase from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";

const ProfileUpdateContainer = ({ onClose }: ModalProps) => {
  const [uploadImageFile, setUploadImageFile] = useState<File | null>();
  const [uploadImage, setUploadImage] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  const loginUser = useLoginUserId();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", loginUser],
    queryFn: () => getUser(loginUser),
  });

  useEffect(() => {
    // onchangeImageUpload(user?.profileImg)
    setNickName(`${user?.nickName}`);
  }, [user]);
  console.log(user);

  const logoutHandleSubmit = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const onchangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadImageFile = e.target.files![0];
    const uploadImageName = uploadImageFile.name;
    setUploadImageFile(uploadImageFile);
    setUploadImage(uploadImageName);
  };

  const profileUpdateHandle = async (e: any) => {
    e.preventDefault();
    try {
      const url = [];

      if (uploadImageFile) {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`profileImages/${uploadImage}`, uploadImageFile);
        console.log(data, "이미지데이터");
        url.push(data?.path);
      }
      const updateProfile = {
        profileImage: url,
        nickName,
      };

      await supabase
        .from("users")
        .update(updateProfile)
        .eq("id", user?.id)
        .select();
      alert("수정완료");
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
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={user?.profileImage === null ? "/basicUserImage.png" : ""}
            />
            <S.ImageInput
              type="file"
              accept="image/*"
              onChange={onchangeImageUpload}
            ></S.ImageInput>
          </S.ProfileImageContainer>
          <S.NickNameInput
            value={nickName}
            type="text"
            onChange={(e) => setNickName(e.target.value)}
          ></S.NickNameInput>
          <S.ProfileFn>
            <Button
              type="submit"
              variant="contained"
              sx={{ padding: "5px 30px" }}
            >
              수정
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ padding: "5px 30px" }}
              onClick={logoutHandleSubmit}
            >
              로그아웃
            </Button>
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
    ${styleFont.textLarge}
  `,
  ProfileFormContainer: styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  `,
  ProfileImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ProfileImage: styled.img`
    display: block;
    width: 100px;
    height: 100px;
    border: solid 1px #000;
    border-radius: 100%;
    object-fit: cover;
  `,
  ImageInput: styled.input``,
  NickNameInput: styled.input`
    width: 100%;
    padding: 12px 0px;
    margin-bottom: 7px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 3px;
    outline: none;
    letter-spacing: -1px;
  `,
  ProfileFn: styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
  `,
};

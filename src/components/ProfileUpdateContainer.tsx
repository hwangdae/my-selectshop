import React, { useEffect, useState } from "react";
import { ModalProps } from "./ModalMap";
import styled from "styled-components";
import { modal, modalContent } from "@/styles/modal";
import { styleFont } from "@/styles/styleFont";
import supabase from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import { getUser, userProfileUpdate } from "@/api/user";
import Camera from "@/assets/Camera.svg";
import shortId from "shortid";
import { styleColor } from "@/styles/styleColor";

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
    // onchangeImageUpload(user?.profileImage)
    setNickName(`${user?.nickName}`);
  }, [user]);
  console.log(user);

  const onchangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadImageFile = e.target.files![0];
    const uploadImageName = uploadImageFile.name;
    const fileExtension = uploadImageName.split(".").pop();
    const randomFileName = `${shortId.generate()}.${fileExtension}`;
    setUploadImageFile(uploadImageFile);
    setUploadImage(randomFileName);
  };

  const profileUpdateHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let url: string | undefined = "";
      if (uploadImageFile) {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`profileImages/${uploadImage}`, uploadImageFile);
        console.log(data, "이미지데이터");
        url = data?.path.split("/")[1];
      }
      const updateProfile = {
        profileImage: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PROFILEIMAGES}/${url}`,
        nickName,
      };
      userProfileUpdate(updateProfile, user?.id);
      alert("수정완료");
    } catch (error) {
      console.log(error);
    }
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
              src={
                user?.profileImage === null
                  ? "/basicUserImage.png"
                  : user?.profileImage
              }
            />
            <S.ImageLabel htmlFor="profileImg">
              <Camera
                width={"25px"}
                height={"25px"}
                fill={`${styleColor.GRAY[700]}`}
              />
            </S.ImageLabel>
            <S.ImageInput
              type="file"
              accept="image/*"
              id="profileImg"
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
    position: relative;
    right: 0px;
    top: 0px;
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
  ImageLabel: styled.label`
    display: block;
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 25px;
    height: 25px;
    border: solid 1px #eee;
    border-radius: 100%;
  `,
  ImageInput: styled.input`
    display: none;
  `,
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

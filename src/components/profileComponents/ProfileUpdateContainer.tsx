import React, { useEffect, useState } from "react";
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
import { ModalProps } from "../ModalMap";
import { imageCompressionFn } from "@/utilityFunction/imageCompression";
import useUserMutate from "@/hook/useUserMutate";
import { updateProfileType } from "@/types/authType";
import LogoutButton from "../utilityComponents/LogoutButton";

const ProfileUpdateContainer = ({ onClose }: ModalProps) => {
  const [previewProfileImage, setPreviewProfileImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
  const [uploadImage, setUploadImage] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const loginUser = useLoginUserId();

  const { data: user } = useQuery({
    queryKey: ["user", loginUser],
    queryFn: () => getUser(loginUser),
    enabled: !!loginUser,
  });

  const { userMutate, confirmUpdateProfileButton } = useUserMutate();

  useEffect(() => {
    setPreviewProfileImage(user?.profileImage as string);
    setNickName(user?.nickName);
  }, [user]);

  const onchangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const uploadImageFile = e.target.files![0];
      const fileType = uploadImageFile.type.split("/")[1];
      if (
        !fileType.includes("jpg") &&
        !fileType.includes("jpeg") &&
        !fileType.includes("png")
      ) {
        alert(
          '파일은 "*jpg, *jpeg, *png" 만 가능합니다.\n이미지를 다시 업로드 해주세요.'
        );
        return;
      }
      const compressionFile = await imageCompressionFn(
        uploadImageFile,
        "small"
      );
      const uploadImageName = compressionFile?.name;
      const fileExtension = uploadImageName?.split(".").pop();
      const randomFileName = `${shortId.generate()}.${fileExtension}`;
      if (compressionFile) {
        const reader = new FileReader();
        reader.readAsDataURL(compressionFile);
        reader.onloadend = () => {
          setPreviewProfileImage(reader.result);
        };
      }
      setUploadImageFile(compressionFile);
      setUploadImage(randomFileName);
    } catch (error) {
      console.log(error);
    }
  };

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
      userProfileUpdate(updateProfile, user?.id);
      alert("수정완료");
      window.location.reload();
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
            <S.ProfileImageContainer>
              <S.ProfileImage
                src={
                  previewProfileImage !== undefined
                    ? `${previewProfileImage}`
                    : "/images/basicUserImage.png"
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
                accept="image/*, .jpg, .jpeg, .png"
                id="profileImg"
                onChange={onchangeImageUpload}
              ></S.ImageInput>
            </S.ProfileImageContainer>
            <h1>{user?.email}</h1>
            <S.NickNameInput
              value={nickName}
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
  ProfileImageContainer: styled.div`
    display: inline-block;
    position: relative;
    right: 0px;
    top: 0px;
  `,
  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 100%;
    object-fit: cover;
  `,
  ImageLabel: styled.label`
    cursor: pointer;
    position: absolute;
    right: 50%;
    margin-right: -50px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background-color: ${styleColor.GRAY[200]};
    border-radius: 100%;
  `,
  ImageInput: styled.input`
    display: none;
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

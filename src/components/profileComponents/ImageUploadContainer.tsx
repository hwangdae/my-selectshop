import { styleColor } from "@/styles/styleColor";
import { imageCompressionFn } from "@/utilityFunction/imageCompression";
import React from "react";
import shortid from "shortid";
import styled from "styled-components";
import Camera from "@/assets/Camera.svg";

interface PropsType {
  previewProfileImage: string | ArrayBuffer | null;
  setPreviewProfileImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  setUploadImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setUploadImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploadContainer = ({
  previewProfileImage,
  setPreviewProfileImage,
  setUploadImageFile,
  setUploadImage,
}: PropsType) => {
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
      const randomFileName = `${shortid.generate()}.${fileExtension}`;
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
  return (
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
  );
};

export default ImageUploadContainer;

const S = {
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
};

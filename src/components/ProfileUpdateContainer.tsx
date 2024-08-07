import React, { useState } from "react";
import { ModalProps } from "./ModalMap";
import styled from "styled-components";
import { modal, modalContent } from "@/styles/modal";

const ProfileUpdateContainer: React.FC<ModalProps> = ({onClose}) => {
  const [uploadImgUrl, setUploadImgUrl] = useState<any>("");

  const onchangeImageUpload = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onload = () => {
      setUploadImgUrl(reader.result);
    };
  };
  
  return (
    <S.ProfileUpdateContainer>
      <S.ProfileUpdateInner>
      <span className="close" onClick={onClose}>&times;</span>
      <h1>프로필 수정</h1>
      <form>
        <img src={uploadImgUrl} />
        <input
          type="file"
          accept="image/*"
          onChange={onchangeImageUpload}
        ></input>
        <input type="text"></input>
        <div>
          <button>수정</button>
          <button>로그아웃</button>
        </div>
      </form>
      </S.ProfileUpdateInner>
    </S.ProfileUpdateContainer>
  );
};

export default ProfileUpdateContainer;

const S = {
  ProfileUpdateContainer : styled(modal)``,
  ProfileUpdateInner : styled(modalContent)``
}

import { UserType } from "@/types/authType";
import React from "react";
import FollowContainer from "../bestReviewerComponents/FollowContainer";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  user: UserType;
  type: string;
}
const UserContainer = ({ user, type }: PropsType) => {
  return (
    <S.UserContainer>
      <S.UserInfo>
        <S.ProfileImage src={user?.profileImage} />
        <S.UserName $type={type}>{user?.nickName}</S.UserName>
      </S.UserInfo>
      <FollowContainer id={user?.id} />
    </S.UserContainer>
  );
};

export default UserContainer;

const S = {
  UserContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0px 12px;
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  ProfileImage: styled.img`
    width: 32px;
    height: 32px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserName: styled.p<{ $type: string }>`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${(props) => props.$type === "follow" ? "#fff" : "#111"};
  `,
};

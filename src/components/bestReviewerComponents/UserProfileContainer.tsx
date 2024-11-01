import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import React from "react";
import styled from "styled-components";

interface PropsType {
  user: UserType;
}

const UserProfileContainer = ({ user }: PropsType) => {
  const { profileImage, nickName } = user;

  return (
    <S.ProfileInfo>
      <div>
        <S.ProfileImage src={profileImage} />
      </div>
      <div>
      <S.UserEmail>{nickName}</S.UserEmail>
      <S.UserActivity>
        <S.Activity>
          <h3>리뷰수</h3>
          <p>0</p>
        </S.Activity>
        <S.Activity>
          <h3>팔로워</h3>
          <p>0</p>
        </S.Activity>
      </S.UserActivity>
      </div>
    </S.ProfileInfo>
  );
};

export default UserProfileContainer;

const S = {
  ProfileInfo: styled.div`
    width: 100%;
    display: flex;
  `,
  ProfileImage: styled.img`
    width: 60px;
    height: 60px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserEmail: styled.h2`
    ${styleFont.textMedium}
    margin-bottom: 8px;
  `,
  UserActivity: styled.ul`
    display: flex;
    justify-content: space-between;
    :first-child {
      padding-left: 0px;
    }
    :last-child {
      border-right: none;
    }
  `,
  Activity: styled.li`
    width: 50%;
    border-right: solid 1px #eee;
    padding-left: 10px;
    h3 {
      ${styleFont.textsmall}
      color: ${styleColor.GRAY[600]};
    }
    p {
      ${styleFont.textsmall}
      color: ${styleColor.GRAY[600]};
    }
  `,
};

import { getUser } from "@/api/user";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import ProfileUpdate from "@/assets/ProfileUpdate.svg";
import { useRouter } from "next/router";
import UserActivity from "./UserActivity";
import { UserType } from "@/types/authType";

const ProfileContainer = () => {
  const loginUser = useLoginUserId();
  const router = useRouter();

  const {
    data: user
  } = useQuery({
    queryKey: ["user", loginUser],
    queryFn: () => getUser(loginUser),
    enabled: !!loginUser,
  });

  const updateProfileButtonhandle = () => {
    router.push("?modal=profile");
  };

  return (
    <div>
      {loginUser && (
        <S.ProfileContainer>
          <S.UserNickName>안녕하세요 {user?.nickName}님 👋</S.UserNickName>
          <S.ProfileInfoContainer>
            <S.ProfileImageContainer>
              <S.ProfileImage src={user?.profileImage} />
              <S.ProfileUpdateButton onClick={updateProfileButtonhandle}>
                <ProfileUpdate
                  width={"15px"}
                  height={"15px"}
                  fill={`${styleColor.GRAY[700]}`}
                />
              </S.ProfileUpdateButton>
            </S.ProfileImageContainer>
            <S.ProfileInfo>
              <S.UserEmail>{user?.email}</S.UserEmail>
              <UserActivity loginUser={loginUser} userId={user?.id}/>
            </S.ProfileInfo>
          </S.ProfileInfoContainer>
        </S.ProfileContainer>
      )}
    </div>
  );
};

export default ProfileContainer;

const S = {
  ProfileContainer: styled.div`
    padding: 20px 12px;
  `,
  UserNickName: styled.h1`
    ${styleFont.text.txt_lg}
    margin-bottom: 14px;
  `,

  ProfileInfoContainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  ProfileImageContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  ProfileImage: styled.img`
    width: 60px;
    height: 60px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  ProfileUpdateButton: styled.button`
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: ${styleColor.GRAY[200]};
    border-radius: 100%;
  `,
  ProfileInfo: styled.div`
    width: 70%;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
    margin-bottom: 8px;
  `,
};

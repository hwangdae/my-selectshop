import { getUser } from "@/api/user";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import ProfileUpdate from "@/assets/ProfileUpdate.svg";
import { useRouter } from "next/router";

const ProfileContainer = () => {
  const loginUser = useLoginUserId();
  const router = useRouter()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user",loginUser],
    queryFn: () => getUser(loginUser),
  });
  // console.log(user,"유저")
  const updateProfileButtonhandle = () => {
    router.push('?modal=profile', undefined, { shallow: true });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }
  return (
    <div>
      {loginUser && (
        <S.ProfileContainer>
          <S.UserNickName>안녕하세요 {user?.nickName}님 👋</S.UserNickName>
          <S.ProfileInfoContainer>
            <S.ProfileImageContainer>
              <S.ProfileImage src={user?.profileImage !== null ? `${user?.profileImage}` : "/images/basicUserImage.png"} />
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
              <S.UserActivity>
                <S.Activity>
                  <h3>리뷰수</h3>
                  <p>0</p>
                </S.Activity>
                <S.Activity>
                  <h3>팔로워</h3>
                  <p>0</p>
                </S.Activity>
                <S.Activity>
                  <h3>팔로잉</h3>
                  <p>0</p>
                </S.Activity>
              </S.UserActivity>
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
    ${styleFont.textLarge}
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
    width: 33.3%;
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

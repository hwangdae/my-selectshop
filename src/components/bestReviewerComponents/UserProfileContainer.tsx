import { getAllReview } from "@/api/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

interface PropsType {
  user: UserType;
}

const UserProfileContainer = ({ user }: PropsType) => {
  const { id, profileImage, nickName } = user;
  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
  });
  console.log(reviewData);
  const reviewCount = reviewData?.filter((review) => {
    return review.userId === id;
  }).length;
  return (
    <S.ProfileInfoContainer>
      <S.ProfileInfoInner>
        <div>
          <S.ProfileImage src={profileImage} />
        </div>
        <div>
          <S.UserEmail>{nickName}</S.UserEmail>
          <S.UserActivity>
            <S.Activity>
              <h3>
                리뷰수<span>{reviewCount}</span>
              </h3>
            </S.Activity>
            <S.Activity>
              <h3>
                팔로워<span>0</span>
              </h3>
            </S.Activity>
          </S.UserActivity>
        </div>
        <S.FollowButton>팔로우</S.FollowButton>
      </S.ProfileInfoInner>
    </S.ProfileInfoContainer>
  );
};

export default UserProfileContainer;

const S = {
  ProfileInfoContainer: styled.div`
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px 1px rgba(124, 124, 124, 0.1);
    border-radius: 4px;
  `,
  ProfileInfoInner: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 10px;
  `,
  ProfileImage: styled.img`
    width: 60px;
    height: 60px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
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
    display: flex;
    width: 70%;
    border-right: solid 1px #eee;
    padding-left: 10px;
    h3 {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    span {
      margin-left: 7px;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
  `,
  FollowButton: styled.button``,
};

import { getAllReview } from "@/api/review";
import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

interface PropsType {
  user: any;
}

const UserProfileContainer = ({ user }: PropsType) => {
  const { id, profileImage, nickName, review } = user;
  const loginUser = useLoginUserId();

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
  });

  const reviewCount = reviewData?.filter((review) => {
    return review.userId === id;
  }).length;

  const viewBestReviewerReviews = () => {
    alert("test")
  }

  const followButtonHandler = async (e:any) => {
    e.stopPropagation()
    const follow = {
      follower_id: loginUser,
      followee_id: id,
    };
    await supabase.from("follows").insert(follow);
  };

  return (
    <S.ProfileInfoContainer onClick={viewBestReviewerReviews}>
      <S.ProfileInfoInner>
        <S.ProfileImageWrap>
          <S.ProfileImage src={profileImage} />
        </S.ProfileImageWrap>
        <S.UserInfoWrap>
          <S.UserEmail>{nickName}</S.UserEmail>
          <S.UserActivity>
            <S.Activity>
              <h3>
                리뷰수<span>{review.length}</span>
              </h3>
            </S.Activity>
            <S.Activity>
              <h3>
                팔로워<span>0</span>
              </h3>
            </S.Activity>
          </S.UserActivity>
        </S.UserInfoWrap>
        {loginUser !== id && (
          <S.FollowButton onClick={followButtonHandler}>팔로우</S.FollowButton>
        )}
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
    padding: 20px 18px;
  `,
  ProfileImageWrap: styled.div`
    width: 20%;
  `,
  ProfileImage: styled.img`
    width: 55px;
    height: 55px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserInfoWrap: styled.div`
    width: 45%;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
    margin-bottom: 8px;
  `,
  UserActivity: styled.ul`
    display: flex;
  `,
  Activity: styled.li`
    display: flex;
    border-right: solid 1px #eee;
    margin-right: 5px;
    padding-right: 5px;
    letter-spacing: -1px;
    h3 {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    span {
      margin-left: 4px;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    &:last-child {
      border-right: none;
      padding-right: 0px;
    }
  `,
  FollowButton: styled.button`
    width: 25%;
    ${styleFont.text.txt_sm}
    color: #ff7b00;
    border-radius: 4px;
    background-color: ${styleColor.YELLOW.main};
    padding: 7px 0px;
  `,
};

import { getAllFollowList } from "@/api/follow";
import { getReviewCount } from "@/api/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { AuthType, UserType } from "@/types/authType";
import { FollowType } from "@/types/followType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

interface PropsType {
  loginUser: string;
  userId: string;
}

const UserActivity = ({ loginUser, userId }: PropsType) => {

  const { data: followList } = useQuery({
    queryKey: ["followee"],
    queryFn: () => getAllFollowList(),
  });

  const { data: reviewCount } = useQuery({
    queryKey: ["review", loginUser],
    queryFn: () => getReviewCount(loginUser),
  });

  const followerCount = followList?.filter((v:FollowType) => {
    return v.followee_id === userId;
  }).length;

  const followingCount = followList?.filter((v:FollowType) => {
    return v.follower_id === userId;
  }).length;

  return (
    <S.UserActivity>
      <S.Activity>
        <h3>리뷰수</h3>
        <p>{reviewCount}</p>
      </S.Activity>
      <S.Activity>
        <h3>팔로워</h3>
        <p>{followerCount}</p>
      </S.Activity>
      <S.Activity>
        <h3>팔로잉</h3>
        <p>{followingCount}</p>
      </S.Activity>
    </S.UserActivity>
  );
};

export default UserActivity;

const S = {
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
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    p {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
  `,
};

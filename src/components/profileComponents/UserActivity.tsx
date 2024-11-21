import { getAllFollowList } from "@/api/follow";
import { getReviewCount } from "@/api/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { AuthType } from "@/types/authType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

interface PropsType {
  loginUser: string;
  user: AuthType;
}

const UserActivity = ({ loginUser, user }: PropsType) => {
  const { id } = user;

  const { data: followList } = useQuery({
    queryKey: ["followee"],
    queryFn: () => getAllFollowList(),
  });

  const { data: reviewCount } = useQuery({
    queryKey: ["review", loginUser],
    queryFn: () => getReviewCount(loginUser),
  });

  const followerCount = followList?.filter((v) => {
    return v.followee_id === id;
  }).length;

  const followingCount = followList?.filter((v) => {
    return v.follower_id === id;
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

import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React from "react";
import styled from "styled-components";
import Tags from "../utilityComponents/Tags";
import FollowContainer from "../bestReviewerComponents/FollowContainer";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import UserContainer from "../utilityComponents/UserContainer";

interface PropsType {
  review: ReviewType;
}

const AllReview = ({ review }: PropsType) => {
  const { userId, description, tags } = review;

  const { data: users } = useQuery({
    queryKey: ["user"],
    queryFn: () => getAllUsers(),
  });

  const user = users?.find((user: UserType) => {
    return user.id === userId;
  });

  return (
    <S.ReviewWrap>
      <UserContainer user={user} type={"allReview"}/>
      <S.ReviewDescription>{description}</S.ReviewDescription>
      <Tags tags={tags} type={"allReview"} />
    </S.ReviewWrap>
  );
};

export default AllReview;

const S = {
  ReviewWrap: styled.li`
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  `,
  ReviewDescription: styled.h1`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    margin-bottom: 10px;
    ${styleFont.text.txt_sm}
    font-weight: 400;
  `,
};

import { getAllReview } from "@/api/review";
import { getAllUsers } from "@/api/user";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import UserProfileContainer from "./UserProfileContainer";

const BestReviewer = () => {
  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
  });
  const { data: users } = useQuery({
    queryKey: ["user"],
    queryFn: () => getAllUsers(),
  });
  console.log(reviewData);
  console.log(users);
  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        <S.Title>
          <span>👍 TOP 10</span> 베스트 리뷰어
        </S.Title>
        {users?.map((user) => {
          return (
            <UserProfileContainer user={user}/>
          );
        })}
      </S.InnerContainer>
    </S.BestReviewerContainer>
  );
};

export default BestReviewer;

const S = {
  BestReviewerContainer: styled.div``,
  InnerContainer: styled.div`
    padding: 0px 12px;
  `,
  Title: styled.h1`
    ${styleFont.textLarge}
    span {
      color: ${styleColor.YELLOW.main};
    }
  `,
};

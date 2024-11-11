import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React from "react";
import styled from "styled-components";
import Tags from "../utilityComponents/Tags";

interface PropsType {
  review: ReviewType;
  users: any;
}

const AllReview = ({ review, users }: PropsType) => {
  const { userId, description, tags } = review;

  const user = users?.find((user: UserType) => {
    return user.id === userId;
  });

  return (
    <S.ReviewWrap>
      <S.UserContainer>
        <S.ProfileImage src={user?.profileImage} />
        <S.writtenUser>{user?.nickName}님의 후기</S.writtenUser>
      </S.UserContainer>
      <S.ReviewDescription>{description}</S.ReviewDescription>
      <Tags tags={tags}/>
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
  UserContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  `,
  ProfileImage: styled.img`
    width: 32px;
    height: 32px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  writtenUser: styled.p`
    ${styleFont.text.txt_sm}
    font-weight: 400;
  `,
  ReviewDescription: styled.h1`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    margin-bottom: 10px;
    ${styleFont.text.txt_sm}
    font-weight: 400;
  `,
  
};

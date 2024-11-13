import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React from "react";
import styled from "styled-components";
import ReviewContainer from "./ReviewContainer";
import { PlaceType } from "@/types/placeType";

interface PropsType {
  user: UserType;
  selectshops : PlaceType[]
}

const ReviewListContainer = ({ user,selectshops }: PropsType) => {
  const { nickName, review } = user;

  const filteredReviews = review?.filter((v1)=>{
    return selectshops.some((v2)=> v2.id === v1.selectshopId)
  })

  const reviewsWithShopInfo = filteredReviews?.map((v) => {
    const shopInfo = selectshops.find((shop) => shop.id === v.selectshopId);
    return { ...v, shopInfo };
  });

  return (
    <S.ReviewListContainer>
      <S.Title>{nickName}님의 리뷰 리스트</S.Title>
      <S.ReviewWrap>
        {reviewsWithShopInfo?.map((review: ReviewType) => {
          return (
            <ReviewContainer key={review.selectshopId} review={review} />
          );
        })}
      </S.ReviewWrap>
    </S.ReviewListContainer>
  );
};

export default ReviewListContainer;

const S = {
  ReviewListContainer: styled.div`
    position: absolute;
    left: 360px;
    top: 0px;
    background-color: #fff;
    width: 300px;
    height: 100vh;
    z-index: 999;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Title: styled.h1`
    text-indent: 6px;
    padding: 14px 0px;
    ${styleFont.title.tit_md}
    font-weight: 600;
    background: linear-gradient(to right, #528599 0%, #8bb0be 100%);
  `,
  ReviewWrap: styled.ul`
    padding: 20px 12px;
  `,
};

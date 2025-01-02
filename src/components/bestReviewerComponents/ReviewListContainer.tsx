import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewContainer from "./ReviewContainer";
import { PlaceType } from "@/types/placeType";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import { styleColor } from "@/styles/styleColor";
import { useRecoilState } from "recoil";
import { boundsState, shopCoordinatesState } from "@/globalState/recoilState";
import MyReviewContainer from "../utilityComponents/MyReviewContainer";

interface PropsType {
  user: UserType;
  selectshops: PlaceType[];
}

const ReviewListContainer = ({ user, selectshops }: PropsType) => {
  const { nickName, reviews } = user;
  const [detailReview, setDetailReview] = useState<any>();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [, setShopCoordinates] = useRecoilState<any>(shopCoordinatesState);
  const [_, setBounds] = useRecoilState<any>(boundsState);

  const filteredReviews = reviews?.filter((v1) => {
    return selectshops.some((v2) => v2.id === v1.selectshopId);
  });

  const reviewsWithShopInfo = filteredReviews?.map((v: ReviewType) => {
    const shopInfo = selectshops.find((shop) => shop.id === v.selectshopId);
    return { ...v, shopInfo };
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const shopCoordinates = reviewsWithShopInfo?.map(
        (review) => review.shopInfo
      );
      shopCoordinates?.forEach((coordinate) => {
        const position = {
          lat: coordinate?.y as number,
          lng: coordinate?.x as number,
        };
        bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
      });
      setShopCoordinates(shopCoordinates as PlaceType[]);
      setBounds(bounds);
    }
    return () => {
      setShopCoordinates([])
    }
  }, []);

  return (
    <S.ReviewListContainer>
      {isReviewOpen ? (
        <S.TitleWrap>
          <button onClick={() => setIsReviewOpen(false)}>
            <ArrowLeft width={"16px"} fill={`${styleColor.YELLOW.main}`} />
          </button>
          <S.Title>{detailReview?.shopInfo?.place_name}</S.Title>
        </S.TitleWrap>
      ) : (
        <S.TitleWrap>
          <S.Title>{nickName}님의 리뷰 리스트</S.Title>
        </S.TitleWrap>
      )}
      {isReviewOpen ? (
        <MyReviewContainer
          review={detailReview}
          nickName={nickName}
        />
      ) : (
        <S.ReviewListWrap>
          {reviewsWithShopInfo?.map((review: ReviewType) => {
            return (
              <li
                key={review.id}
                onClick={() => {
                  setDetailReview(review);
                  setIsReviewOpen(true);
                }}
              >
                <ReviewContainer key={review.selectshopId} review={review} />
              </li>
            );
          })}
        </S.ReviewListWrap>
      )}
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
  TitleWrap: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    background: linear-gradient(to right, #528599 0%, #8bb0be 100%);
    padding-left: 4px;
    button {
      cursor: pointer;
      margin-top: 7px;
    }
  `,

  Title: styled.h1`
    text-indent: 6px;
    padding: 14px 0px;
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  ReviewWrap: styled.ul`
    /* padding: 20px 12px; */
  `,
  ReviewListWrap: styled.ul`
    padding: 20px 12px;
  `,
};

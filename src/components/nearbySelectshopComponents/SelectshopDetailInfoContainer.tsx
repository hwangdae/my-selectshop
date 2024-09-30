import React, { useState } from "react";
import styled from "styled-components";
import MyReviewContainer from "./MyReviewContainer";
import SelectshopReviewContainer from "./SelectshopReviewContainer";
import WriteReview from "@/pages/writeReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewAndUser } from "@/api/review";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import AllReview from "./AllReview";

interface PropsType {
  selectshop: PlaceType;
}

const SelectshopDetailInfoContainer = ({ selectshop }: PropsType) => {
  const { id, place_name, x, y } = selectshop;
  const loginUser = useLoginUserId();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const { data: reviewData } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewAndUser(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const myReview = reviewData?.find((review: ReviewType) => {
    return review?.selectshopId === id && review?.userId === loginUser;
  });

  return (
    <S.DetailContainer>
      <S.DetailSelectshopName>{place_name}</S.DetailSelectshopName>
      {isWriteReviewOpen ? (
        <WriteReview />
      ) : (
        <>
          {myReview ? (
            <MyReviewContainer review={myReview} />
          ) : (
            <SelectshopReviewContainer
              id={id}
              onWriteReviewClick={() => setIsWriteReviewOpen(true)}
            />
          )}
        </>
      )}
      {!isWriteReviewOpen && (
        <S.AllReviewContainer>
          {reviewData?.map((review: ReviewType) => (
            <AllReview review={review} key={review.id} />
          ))}
        </S.AllReviewContainer>
      )}
    </S.DetailContainer>
  );
};

export default SelectshopDetailInfoContainer;

const S = {
  DetailContainer: styled.div`
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
  DetailSelectshopName: styled.h1`
    text-indent: 6px;
    padding: 14px 0px;
    ${styleFont.textLarge}
    background-color: ${styleColor.RED[0]};
  `,
  AllReviewContainer: styled.ul`
    padding: 0px 18px;
  `,
};
import React, { useState } from "react";
import styled from "styled-components";
import SelectshopReviewContainer from "./SelectshopReviewContainer";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/api/review";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleFont } from "@/styles/styleFont";
import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import AllReview from "./AllReview";
import WriteReview from "../writeReviewComponents/WriteReview";
import useInitializeMapState from "@/hook/useInitializeMapState";
import MyReviewContainer from "../utilityComponents/MyReviewContainer";
import { Button } from "@mui/material";
import { styleColor } from "@/styles/styleColor";

interface PropsType {
  selectshop: PlaceType;
}

const SelectshopDetailInfoContainer = ({ selectshop }: PropsType) => {
  const { id, place_name, x, y } = selectshop;
  const loginUser = useLoginUserId();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  useInitializeMapState(y, x);

  const { data: reviewData } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id),
    enabled: !!id,
  });

  const myReview = reviewData?.find((review: ReviewType) => {
    return review?.selectshopId === id && review?.userId === loginUser;
  });

  return (
    <S.DetailContainer>
      <S.DetailSelectshopHeader>
        <S.DetailSelectshopName>{place_name}</S.DetailSelectshopName>
        {myReview && <Button color="secondary"  size="small">수정</Button>}
      </S.DetailSelectshopHeader>
      {isWriteReviewOpen ? (
        <WriteReview selectshopId={id} />
      ) : (
        <>
          {myReview ? (
            <MyReviewContainer review={myReview} />
          ) : (
            <SelectshopReviewContainer
              onWriteReviewClick={() => setIsWriteReviewOpen(true)}
            />
          )}
        </>
      )}
      {!isWriteReviewOpen && (
        <S.AllReviewContainer>
          {reviewData?.map((review: ReviewType) => (
            <AllReview key={review.id} review={review} />
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
  DetailSelectshopHeader :styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #528599 0%, #8bb0be 100%);
    padding: 0px 6px;
  `,
  DetailSelectshopName: styled.h1`
    padding: 14px 0px;
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  AllReviewContainer: styled.ul`
    padding: 0px 18px;
  `,
};

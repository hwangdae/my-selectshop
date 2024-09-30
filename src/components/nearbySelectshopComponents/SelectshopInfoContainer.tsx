import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useState } from "react";
import styled from "styled-components";
import { PlaceType } from "@/types/placeType";
import { useQuery } from "@tanstack/react-query";
import {  getReviewAndUser } from "@/api/review";
import PatchCheck from "@/assets/PatchCheck.svg";
import FullfillPatchCheck from "@/assets/FullfillPatchCheck.svg";
import useLoginUserId from "@/hook/useLoginUserId";
import { ReviewType } from "@/types/reviewType";

interface PropsType {
  selectshop: PlaceType;
}

const SelectshopInfoContainer = ({ selectshop }: PropsType) => {
  const { id, place_name, address_name, phone, distance } = selectshop;
  const loginUser = useLoginUserId();

  const { data: reviewData} = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewAndUser(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const myReview = reviewData?.find((review: ReviewType) => {
    return review?.selectshopId === id && review?.userId === loginUser;
  });

  return (
      <S.SelectshopContainer>
        <S.SlectshopContents>
          <S.SelectshopInfo>
            <S.SelectshopName>
              {place_name}
              <S.SelectshopDistance>
                {distance >= 1000
                  ? `${(distance / 1000).toFixed(1)}km`
                  : `${distance}m`}
              </S.SelectshopDistance>
            </S.SelectshopName>
            <S.SelectshopAddressName>{address_name}</S.SelectshopAddressName>
            <S.SelectshopPhone>{phone}</S.SelectshopPhone>
          </S.SelectshopInfo>
          <S.SelectshopFn>
            <S.SelectshopMoreInfoButton>
              {myReview ? (
                <FullfillPatchCheck
                  width={"18px"}
                  height={"18px"}
                  fill={`${styleColor.RED[0]}`}
                />
              ) : (
                <PatchCheck width={"18px"} height={"18px"} />
              )}
            </S.SelectshopMoreInfoButton>
          </S.SelectshopFn>
        </S.SlectshopContents>
        {myReview && (
          <S.PreviewReviewContainer>
            <S.PreviewReviewTitle>나의 후기</S.PreviewReviewTitle>
            <S.PreviewReviewDescription>
              {myReview?.description}
            </S.PreviewReviewDescription>
          </S.PreviewReviewContainer>
        )}
      </S.SelectshopContainer>
  );
};

export default SelectshopInfoContainer;

const S = {
  SelectshopContainer: styled.div`
    cursor: pointer;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 20px 12px;
    margin: 20px;
  `,
  SlectshopContents: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  SelectshopInfo: styled.div`
    width: 85%;
  `,
  SelectshopName: styled.h1`
    display: flex;
    align-items: center;
    ${styleFont.textLarge};
    margin-bottom: 14px;
  `,
  SelectshopDistance: styled.span`
    ${styleFont.textsmall};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
    margin-left: 6px;
  `,

  SelectshopAddressName: styled.h2`
    ${styleFont.textMedium}
    margin-bottom: 6px;
  `,
  SelectshopPhone: styled.p``,
  SelectshopFn: styled.div``,
  SelectshopMoreInfoButton: styled.button`
    cursor: pointer;
  `,
  SelectshopFavoritesButton: styled.button`
    cursor: pointer;
  `,
  //프리뷰 리뷰
  PreviewReviewContainer: styled.div`
    border-radius: 4px;
    background-color: ${styleColor.GRAY[0]};
    margin-top: 10px;
    padding: 10px;
  `,
  PreviewReviewTitle: styled.h2`
    ${styleFont.textMedium}
    color: ${styleColor.RED[100]};
    font-weight: bold;
  `,
  PreviewReviewDescription: styled.p`
    ${styleFont.textsmall}
    font-weight: 400;
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

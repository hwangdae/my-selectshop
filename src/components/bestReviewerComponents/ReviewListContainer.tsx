import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { ReviewType } from "@/types/reviewType";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import SelectshopContainer from "./SelectshopTitleContainer";

interface PropsType {
  user: UserType;
}

const ReviewListContainer = ({ user }: PropsType) => {
  const { nickName, review } = user;

  return (
    <S.ReviewListContainer>
      <S.Title>{nickName}님의 리뷰 리스트</S.Title>
      <S.ReviewWrap>
        {review?.map((v: ReviewType) => {
          return (
            <li>
              <h2>
                {v.reviewImages === null || v.reviewImages === "" ? (
                  <S.NoImage src="images/noImage.jpg" />
                ) : (
                  <img src={v.reviewImages}></img>
                )}
              </h2>
              <S.TextWrap>
                <SelectshopContainer selectshopId={v.selectshopId} />
                <S.ReviewText>{v.description}</S.ReviewText>
              </S.TextWrap>
            </li>
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
    li {
      border-radius: 4px;
      box-shadow: 0px 0px 8px 1px rgba(182, 182, 182, 0.1);
      margin-bottom: 20px;
      h2 {
        width: 100%;
        height: 80px;
        border-radius: 4px 4px 0px 0px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  `,
  TextWrap: styled.div`
    padding: 16px 10px 10px 10px;
  `,
  ReviewText: styled.p`
    background-color: ${styleColor.GRAY[0]};
    ${styleFont.text.txt_sm}
    padding: 6px;
  `,
  NoImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

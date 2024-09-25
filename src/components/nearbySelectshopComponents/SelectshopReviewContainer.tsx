import useLoginUserId from "@/hook/useLoginUserId";
import { styleFont } from "@/styles/styleFont";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface PropsType {
  id: string;
}

const SelectshopReviewContainer = ({ id }: PropsType) => {
  const loginUser = useLoginUserId();
  const router = useRouter();
  return (
    <S.SelectshopReviewContainer>
      <S.SelectshopReviewTitle>📒 나의 후기</S.SelectshopReviewTitle>
      <S.MySelectshopReview>
        <S.NoReview>등록된 후기가 없습니다.</S.NoReview>
        <Button
          onClick={() => {
            if (!loginUser) {
              alert("로그인이 필요한 서비스 입니다.");
              return;
            }
            router.push(
              { pathname: "/writeReview", query: { id } },
              "/writeReview"
            );
          }}
          variant="contained"
          sx={{ padding: "5px 30px" }}
        >
          후기 등록하기
        </Button>
      </S.MySelectshopReview>
    </S.SelectshopReviewContainer>
  );
};

export default SelectshopReviewContainer;

const S = {
  SelectshopReviewContainer: styled.div`
    border-top: solid 1px #999;
    padding: 20px 18px 30px 18px;
  `,
  SelectshopReviewTitle: styled.h1`
    ${styleFont.textLarge}
    margin-bottom: 30px;
  `,
  MySelectshopReview: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  NoReview: styled.p`
    ${styleFont.textMedium}
    margin-bottom: 10px;
  `,
  WriteReviewButton: styled.button``,

  AllReviewContainer: styled.ul`
    padding: 0px 18px;
  `,
};

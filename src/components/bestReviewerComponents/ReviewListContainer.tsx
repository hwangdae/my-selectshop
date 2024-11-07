import React, { useState } from "react";
import styled from "styled-components";

const ReviewListContainer = () => {
  const [isReviewListOpen, setIsReviewListOpen] = useState<Boolean>(false);
  return <S.ReviewListContainer></S.ReviewListContainer>;
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
};

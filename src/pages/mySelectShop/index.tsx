import React from "react";
import styled from "styled-components";
import Shop from "@/assets/Shop.svg";
import { styleFont } from "@/styles/styleFont";

interface Propstype {
  step: number;
}

const MySelectShop = () => {
  return (
    <S.Container
      // step={step}
      // animate={{ translateX: `${(1 - step) * 100}%` }}
      // transition={{ ease: "easeInOut" }}
    >
      <S.EmptyInner>
        <S.EmptyIcon>
          <Shop fill={"#cccccc"} width="100px" height="100px" />
        </S.EmptyIcon>
        <S.EmptyTitle>내 셀렉샵엔 아직 아무것도 없어요 !</S.EmptyTitle>
      </S.EmptyInner>
    </S.Container>
  );
};

export default MySelectShop;

const S = {
  Container: styled.div`
    margin-top: 183px;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
  `,
  EmptyIcon: styled.p`
    padding-bottom: 10px;
  `,
  EmptyInner: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  `,
  EmptyTitle: styled.h2`
    ${styleFont.textMedium};
    color: #8f8f8f;
  `
};

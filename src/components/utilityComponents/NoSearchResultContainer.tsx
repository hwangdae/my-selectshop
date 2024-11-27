import { searchTermState } from "@/globalState/recoilState";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const NoSearchResultContainer = () => {
  const searchTerm = useRecoilValue(searchTermState);

  return (
    <S.NoSearchResult>
      <h2>셀렉샵 검색결과가 없습니다.</h2>
      <span>"{searchTerm}"</span>
    </S.NoSearchResult>
  );
};

export default NoSearchResultContainer;

const S = {
  NoSearchResult: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
    ${styleFont.text.txt_md}
    h2 {
      display: block;
    }
    span {
      display: block;
      font-weight: 600;
      color: ${styleColor.YELLOW.main};
    }
  `,
};

import SelectshopInfo from "@/components/SelectshopInfo";
import { selectShopsState } from "@/globalState/recoilState";
import { PlaceType } from "@/types/placeType";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const SearchResults = () => {
  const selectShops = useRecoilValue(selectShopsState);

  return (
    <S.SearchResultsContainer>
      <S.SearchResultsInner>
        {selectShops?.map((Selectshop: PlaceType) => {
          return <SelectshopInfo key={Selectshop.id} Selectshop={Selectshop} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul`
    width: 100%;
  `,
};

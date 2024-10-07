import { selectShopsState } from "@/globalState/recoilState";
import { PaginationType, PlaceType } from "@/types/placeType";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import PaginationContainer from "../nearbySelectshopComponents/PaginationContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";

const VisitedSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {searchPlaces, pagination, selectshops, myLocation} = useKakaoSearch()

  return (
    <>
      <S.SearchResultsInner>
        {selectshops?.map((selectshop: PlaceType) => (
          <li
            onClick={() => {
              setActiveShopId(selectshop.id);
            }}
          >
            <SelectshopInfoContainer
              key={selectshop.id}
              selectshop={selectshop}
            />
          </li>
        ))}
      </S.SearchResultsInner>
      <PaginationContainer
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {selectshops?.map((selectshop: PlaceType) => {
        return (
          activeShopId === selectshop.id && (
            <SelectshopDetailInfoContainer
              key={selectshop.id}
              selectshop={selectshop}
            />
          )
        );
      })}
    </>
  );
};

export default VisitedSelectshop;

const S = {
  SearchResultsInner: styled.ul``,
};

import PaginationContainer from "@/components/nearbySelectshopComponents/PaginationContainer";
import { PlaceType } from "@/types/placeType";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopDetailInfoContainer from "./SelectshopDetailInfoContainer";
import SelectshopInfoContainer from "./SelectshopInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";

const NearbySelectshop = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { searchPlaces, pagination, selectshops, myLocation } = useKakaoSearch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (myLocation.center.lat && myLocation.center.lng) {
        searchPlaces(currentPage);
      }
    }
  }, [currentPage]);

  return (
    <S.SearchResultsContainer ref={scrollRef}>
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
        scrollRef={scrollRef}
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
    </S.SearchResultsContainer>
  );
};

export default NearbySelectshop;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul`
    width: 100%;
  `,
};

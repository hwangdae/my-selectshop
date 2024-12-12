import { PlaceType } from "@/types/placeType";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import { ReviewType } from "@/types/reviewType";
import { getPaginatedItems } from "@/utilityFunction/pagenate";
import CustomPaginationContainer from "../utilityComponents/CustomPaginationContainer";
import { useRecoilValue } from "recoil";
import { searchTermState } from "@/globalState/recoilState";
import NoSearchResultContainer from "../utilityComponents/NoSearchResultContainer";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";

const VisitedSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchTerm = useRecoilValue(searchTermState);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    refetchOnWindowFocus: false,
  });
  const { searchAllPlaces, selectshops, myLocation } = useKakaoSearch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (myLocation.center.lat && myLocation.center.lng) {
        searchAllPlaces();
      }
    }
  }, [currentPage]);

  const visitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      reviewData?.some(
        (review: ReviewType) => review.selectshopId === selectshop.id
      ) && selectshop.place_name.includes(searchTerm)
  );

  const currentItems = getPaginatedItems(visitedSelectshops, currentPage);

  return (
    <>
      <S.SearchResultsInner>
        {currentItems.length === 0 && searchTerm === "" ? (
          <S.VisitedShopMessage>
            🏬 아직 방문한 편집샵이 없어요.
          </S.VisitedShopMessage>
        ) : currentItems.length > 0 ? (
          currentItems?.map((selectshop: PlaceType) => (
            <li
              key={selectshop.id}
              onClick={() => {
                setActiveShopId(selectshop.id);
              }}
            >
              <SelectshopInfoContainer selectshop={selectshop} />
              {activeShopId === selectshop.id && (
                <SelectshopDetailInfoContainer selectshop={selectshop} />
              )}
            </li>
          ))
        ) : (
          <NoSearchResultContainer />
        )}
      </S.SearchResultsInner>
      {currentItems.length < 15 ? (
        ""
      ) : (
        <CustomPaginationContainer
          selectshops={visitedSelectshops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
    </>
  );
};

export default VisitedSelectshop;

const S = {
  SearchResultsInner: styled.ul`
    height: 100%;
  `,
  VisitedShopMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};

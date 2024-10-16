import { PlaceType } from "@/types/placeType";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import { ReviewType } from "@/types/reviewType";
import CustomPaginationContainer from "../utilityComponents/CustomPaginationContainer";
import { getPaginatedItems } from "@/utilityFunction/pagenate";

const NotVisiteSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      !reviewData?.some(
        (review: ReviewType) => review.selectshopId === selectshop.id
      )
  );

  const currentItems = getPaginatedItems(notVisitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      <S.SearchResultsInner>
        {currentItems?.map((selectshop: PlaceType) => (
          <li
            key={selectshop.id}
            onClick={() => setActiveShopId(selectshop.id)}
          >
            <SelectshopInfoContainer selectshop={selectshop} />
            {activeShopId === selectshop.id && (
              <SelectshopDetailInfoContainer selectshop={selectshop} />
            )}
          </li>
        ))}
      </S.SearchResultsInner>
      <CustomPaginationContainer
        selectshops={notVisitedSelectshops}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollRef={scrollRef}
      />
    </S.SearchResultsContainer>
  );
};

export default NotVisiteSelectshop;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul``,
};

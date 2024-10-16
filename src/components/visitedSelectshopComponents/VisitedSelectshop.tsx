import { PlaceType } from "@/types/placeType";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import { ReviewType } from "@/types/reviewType";
import PaginationContainer from "../nearbySelectshopComponents/PaginationContainer";
import { getPaginatedItems } from "@/utilityFunction/pagenate";
import CustomPaginationContainer from "../utilityComponents/CustomPaginationContainer";

const VisitedSelectshop = () => {
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

  const visitedSelectshops = selectshops?.filter((selectshop: PlaceType) =>
    reviewData?.some(
      (review: ReviewType) => review.selectshopId === selectshop.id
    )
  );

  const currentItems = getPaginatedItems(visitedSelectshops, currentPage);

  return (
    <>
      <S.SearchResultsInner>
        {currentItems?.map((selectshop: PlaceType) => (
          <li
            onClick={() => {
              setActiveShopId(selectshop.id);
            }}
          >
            <SelectshopInfoContainer
              key={selectshop.id}
              selectshop={selectshop}
            />
            {activeShopId === selectshop.id && (
              <SelectshopDetailInfoContainer
                key={selectshop.id}
                selectshop={selectshop}
              />
            )}
          </li>
        ))}
      </S.SearchResultsInner>
      <CustomPaginationContainer selectshops={visitedSelectshops}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollRef={scrollRef}/>
    </>
  );
};

export default VisitedSelectshop;

const S = {
  SearchResultsInner: styled.ul``,
};

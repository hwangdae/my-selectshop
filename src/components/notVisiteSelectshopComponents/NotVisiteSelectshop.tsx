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

const NotVisiteSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    refetchOnWindowFocus: false,
  });
  const { searchAllPlaces, searchPlaces, pagination, selectshops, myLocation } =
    useKakaoSearch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (myLocation.center.lat && myLocation.center.lng) {
        searchAllPlaces(currentPage);
      }
    }
  }, [currentPage]);

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      !reviewData?.some(
        (review: ReviewType) => review.selectshopId === selectshop.id
      )
  );

  const indexOfLastItem = currentPage * 15;
  const indexOfFirstItem = indexOfLastItem - 15;
  const currentItems = notVisitedSelectshops.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  console.log(currentItems);
  return (
    <S.SearchResultsContainer ref={scrollRef}>
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
          </li>
        ))}
      </S.SearchResultsInner>
      <CustomPaginationContainer
        notVisitedSelectshops={notVisitedSelectshops}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollRef={scrollRef}
      />
      {notVisitedSelectshops?.map((selectshop: PlaceType) => {
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

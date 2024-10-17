import { PlaceType } from "@/types/placeType";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import { ReviewType } from "@/types/reviewType";
import PaginationContainer from "../nearbySelectshopComponents/PaginationContainer";

const VisitedSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    refetchOnWindowFocus: false,
  });
  const { searchAllPlaces, selectshops, myLocation } = useKakaoSearch();

  //모든 데이터가 45개
  //15개씩 보여줄건데 

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
  }, []);

  const visitedSelectshops = selectshops?.filter((selectshop: PlaceType) =>
    reviewData?.some(
      (review: ReviewType) => review.selectshopId === selectshop.id
    )
  );
  return (
    <>
      <S.SearchResultsInner>
        {visitedSelectshops?.map((selectshop: PlaceType) => (
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
      {/* <PaginationContainer
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollRef={scrollRef}
      /> */}
      {visitedSelectshops?.map((selectshop: PlaceType) => {
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

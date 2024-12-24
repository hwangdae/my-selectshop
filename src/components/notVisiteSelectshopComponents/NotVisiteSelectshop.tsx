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
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageState, searchTermState } from "@/globalState/recoilState";
import NoSearchResultContainer from "../utilityComponents/NoSearchResultContainer";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import useLoginUserId from "@/hook/useLoginUserId";

const NotVisiteSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] =
    useRecoilState<number>(currentPageState);
  const loginUser = useLoginUserId();
  const searchTerm = useRecoilValue(searchTermState);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    enabled: !!loginUser,
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
        (review: ReviewType) =>
          review.selectshopId === selectshop.id && review.userId === loginUser
      ) && selectshop.place_name.includes(searchTerm)
  );

  const currentItems = getPaginatedItems(notVisitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      <S.SearchResultsInner>
        {currentItems.length === 0 && searchTerm === "" ? (
          <S.VisitedShopMessage>
            🏬 모든 편집샵을 다 방문 했어요.
          </S.VisitedShopMessage>
        ) : currentItems.length > 0 ? (
          currentItems?.map((selectshop: PlaceType) => (
            <li
              key={selectshop.id}
              onClick={() => setActiveShopId(selectshop.id)}
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
          selectshops={notVisitedSelectshops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
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
  VisitedShopMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};

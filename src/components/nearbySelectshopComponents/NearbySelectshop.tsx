import PaginationContainer from "@/components/nearbySelectshopComponents/PaginationContainer";
import {
  boundsState,
  markersState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import { MarkersType, PaginationType, PlaceType } from "@/types/placeType";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import SelectshopDetailInfoContainer from "./SelectshopDetailInfoContainer";
import SelectshopInfoContainer from "./SelectshopInfoContainer";
import { useRouter } from "next/router";
import WriteReview from "@/pages/writeReview";

const NearbySelectshop = () => {
  const myLocation = useRecoilValue(myLocationState);
  const [, setMarkers] = useRecoilState<MarkersType[]>(markersState);
  const [selectshops, setSelectshops] =
    useRecoilState<PlaceType[]>(selectShopsState);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setBounds] = useRecoilState<any>(boundsState);
  const [activeShopId, setActiveShopId] = useState<string | null>(null);

  const router = useRouter();
  const { tab } = router.query;
  console.log(router, "라우터");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (myLocation.center.lat && myLocation.center.lng) {
        const searchPlaces = (page: number = 1) => {
          const ps = new kakao.maps.services.Places();
          const keyword = "의류판매";
          const options = {
            location: new kakao.maps.LatLng(
              myLocation.center.lat,
              myLocation.center.lng
            ),
            sort: kakao.maps.services.SortBy.DISTANCE,
            page: page,
          };
          ps.keywordSearch(keyword, placesSearchCB, options);
        };

        const placesSearchCB = (
          data: any,
          status: string,
          pagination: PaginationType
        ) => {
          if (status === kakao.maps.services.Status.OK) {
            setSelectshops(data);
            displayPlaces(data);
            setPagination(pagination);
          }
        };

        const displayPlaces = (data: any[]) => {
          const bounds = new kakao.maps.LatLngBounds();
          let newMarkers: MarkersType[] = [];
          data.forEach((place) => {
            const position = {
              lat: place.y,
              lng: place.x,
            };
            newMarkers.push({
              position,
            });
            bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
          });
          setMarkers(newMarkers);
          setBounds(bounds);
        };

        searchPlaces(currentPage);
      }
    }
  }, [myLocation, currentPage]);

  const renderContent = () => {
    switch (tab) {
      case "writeReview":
        return <WriteReview />;
      default:
        return <div>디폴트</div>;
    }
  };

  return (
    <S.SearchResultsContainer>
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
      {/* <div>{renderContent()}</div> */}
      {selectshops?.map((selectshop: PlaceType) => {
        return (
          activeShopId === selectshop.id &&
          // 조건부 렌더링: tab 값에 따라 다른 컴포넌트 반환
          (tab === "writeReview" ? (
            <WriteReview key={selectshop.id} />
          ) : (
            <SelectshopDetailInfoContainer
              key={selectshop.id}
              selectshop={selectshop}
            />
          ))
        );
      })}
      {/* {selectshops?.map((selectshop: PlaceType) => {
        return (
          activeShopId === selectshop.id && (
            <SelectshopDetailInfoContainer
              key={selectshop.id}
              selectshop={selectshop}
            />
          )
        );
      })} */}
    </S.SearchResultsContainer>
  );
};

export default NearbySelectshop;

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

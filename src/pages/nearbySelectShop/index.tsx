import SelectshopInfo from "@/components/SelectshopInfo";
import {
  mapState,
  markersState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import { MarkersType, PlaceType } from "@/types/placeType";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Chevron from "@/assets/Chevron.svg";
import Chevrons from "@/assets/Chevrons.svg";

const NearbySelectShop = () => {
  const map = useRecoilValue(mapState);
  const myLocation = useRecoilValue(myLocationState);
  const [_, setMarkers] = useRecoilState<MarkersType[]>(markersState);
  const [selectShops, setSelectShops] = useState([]);
  const [pagination, setPagination] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log(pagination, "페이지네이션");

  const nextPageButtonHandler = () => {
    if (pagination && pagination.hasNextPage) {
      setCurrentPage(currentPage + 1);
      pagination.nextpage;
    }
  };

  const prevPageButtonHandler = () => {
    if (pagination && pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1);
      pagination.prevPage();
    }
  };

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

        const placesSearchCB = (data: any, status: string, pagination: any) => {
          if (status === kakao.maps.services.Status.OK) {
            console.log(data);
            setSelectShops(data);
            displayPlaces(data);
            setPagination(pagination);
          }
        };

        const displayPlaces = (data: any[]) => {
          const bounds = new kakao.maps.LatLngBounds();
          let newMarkers: MarkersType[] = [];
          data.forEach((place) => {
            newMarkers.push({
              position: {
                lat: place.y,
                lng: place.x,
              },
            });
          });
          setMarkers(newMarkers);
          // map.setBounds(bounds);
        };
        searchPlaces(currentPage);
      }
    }
  }, [myLocation, currentPage]);

  return (
    <S.SearchResultsContainer>
      <S.PaginationContainer>
        <button onClick={() => setCurrentPage(pagination.first)}>
          <Chevrons transform={"rotate(180)"} />
        </button>
        <button onClick={prevPageButtonHandler}>
          <Chevron transform={"rotate(180)"} />
        </button>
        {Array.from({ length: pagination.last }).map((_, index) => {
          return (
            <button onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          );
        })}
        <button onClick={nextPageButtonHandler}>
          <Chevron />
        </button>
        <button onClick={() => setCurrentPage(pagination.last)}>
          <Chevrons />
        </button>
      </S.PaginationContainer>
      <S.SearchResultsInner>
        {selectShops?.map((selectShop: PlaceType) => {
          return <SelectshopInfo key={selectShop.id} selectShop={selectShop} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default NearbySelectShop;

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
  PaginationContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
};

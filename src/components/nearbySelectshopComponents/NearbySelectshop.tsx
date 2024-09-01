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
import SelectshopInfo from "./SelectshopInfo";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk"; // Kakao map import

const NearbySelectshop = () => {
  const myLocation = useRecoilValue(myLocationState);
  const [markers, setMarkers] = useRecoilState<MarkersType[]>(markersState);
  const [selectShops, setSelectShops] =
    useRecoilState<PlaceType[]>(selectShopsState);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [map, setMap] = useState<any>(null);
  const [bounds, setBounds] = useRecoilState<any>(boundsState);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {

        setMap(()=> useMap())

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
            setSelectShops(data);
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
          map.setBounds(bounds);
          console.log(bounds, "바운드스");
        };

        searchPlaces(currentPage);
      }
    }
  }, [myLocation, currentPage,map]);

  return (
    <S.SearchResultsContainer>
      <S.SearchResultsInner>
        {selectShops?.map((selectShop: PlaceType) => (
          <SelectshopInfo key={selectShop.id} selectShop={selectShop} />
        ))}
      </S.SearchResultsInner>
      <PaginationContainer
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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

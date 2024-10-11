import {
  boundsState,
  markersState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import {
  MarkersType,
  MyLocationType,
  PaginationType,
  PlaceType,
} from "@/types/placeType";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useKakaoSearch = () => {
  const myLocation = useRecoilValue(myLocationState);
  const [selectshops, setSelectshops] = useRecoilState(selectShopsState);
  const [pagination, setPagination] = useState<PaginationType>();
  const [, setBounds] = useRecoilState<any>(boundsState);
  const [, setMarkers] = useRecoilState<MarkersType[]>(markersState);

  const searchPlaces = (currentPage: number = 1) => {
    const ps = new window.kakao.maps.services.Places();
    const keyword = "의류판매";
    const options = {
      location: new window.kakao.maps.LatLng(
        myLocation.center.lat,
        myLocation.center.lng
      ),
      sort: window.kakao.maps.services.SortBy.DISTANCE,
      page: currentPage,
    };
    ps.keywordSearch(
      keyword,
      (data, status, pagination) =>
        placesSearchCB(data, status, pagination, [], false),
      options
    );
  };
  const searchAllPlaces = (
    currentPage: number = 1,
    accumulatedShops: PlaceType[] = []
  ) => {
    const ps = new window.kakao.maps.services.Places();
    const keyword = "의류판매";
    const options = {
      location: new window.kakao.maps.LatLng(
        myLocation.center.lat,
        myLocation.center.lng
      ),
      sort: window.kakao.maps.services.SortBy.DISTANCE,
      page: currentPage,
    };
    ps.keywordSearch(
      keyword,
      (data, status, pagination) =>
        placesSearchCB(data, status, pagination, accumulatedShops, true),
      options
    );
  };

  const placesSearchCB = (
    data: any[],
    status: string,
    pagination: PaginationType,
    accumulatedShops: any[] = [],
    isAllPages: boolean = false
  ) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const updatedShops = [...accumulatedShops, ...data];

      if (isAllPages && pagination.current < pagination.last) {
        searchAllPlaces(pagination.current + 1, updatedShops);
      } else {
        setSelectshops(updatedShops);
        displayPlaces(updatedShops);
      }
      if (!isAllPages) {
        setPagination(pagination);
      }
    }
  };

  const displayPlaces = (data: any[]) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    let newMarkers: MarkersType[] = [];
    data.forEach((place) => {
      const position = { lat: place.y, lng: place.x };
      newMarkers.push({ position });
      bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
    });
    setMarkers(newMarkers);
    setBounds(bounds);
  };

  return { searchPlaces, searchAllPlaces, pagination, selectshops, myLocation };
};

export default useKakaoSearch;

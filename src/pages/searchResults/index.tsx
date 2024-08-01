import SelectshopInfo from "@/components/SelectshopInfo";
import { myLocationState, selectShopsState } from "@/globalState/recoilState";
import { MarkersType, PlaceType } from "@/types/placeType";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const SearchResults = () => {
  const myLocation = useRecoilValue(myLocationState)
  const [markers, setMarkers] = useState<MarkersType[]>([]);
  const [selectShops, setSelectShops] = useState([]);


  useEffect(() => {
    if (myLocation.center.lat && myLocation.center.lng) {
      const searchPlaces = () => {
        const ps = new kakao.maps.services.Places();
        const keyword = "의류판매";
        const options = {
          location: new kakao.maps.LatLng(
            myLocation.center.lat,
            myLocation.center.lng
          ),
          sort: kakao.maps.services.SortBy.DISTANCE,
          // page: page, 
        };
        ps.keywordSearch(keyword, placesSearchCB, options);
      };

      const placesSearchCB = (data: any, status: string, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data)
          setSelectShops(data);
          displayPlaces(data);
          // if (pagination.hasNextPage) {
          //   pagination.nextPage(); // 다음 페이지 요청
          // }
        }
      };

      const displayPlaces = (data: any[]) => {
        const bounds = new kakao.maps.LatLngBounds();
        let newMarkers: MarkersType[] = [];
        data.forEach((place) => {
          newMarkers.push({
            position: {
              lat: place.lat,
              lng: place.lng,
            },
          });
        });
        setMarkers((prev) => [...prev, ...newMarkers]);
        // map.setBounds(bounds);
      };

      searchPlaces();
    }
  }, [myLocation]);

  return (
    <S.SearchResultsContainer>
      <S.SearchResultsInner>
        {selectShops?.map((Selectshop: PlaceType) => {
          return <SelectshopInfo key={Selectshop.id} Selectshop={Selectshop} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

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

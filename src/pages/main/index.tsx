"use client";
import SearchContainer from "@/components/SearchContainer";
import { selectShopsState } from "@/globalState/recoilState";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkersType {
  position: {
    lat: number;
    lng: number;
  };
}

const Main = () => {
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>();
  const [selectShops, setSelectShops] = useRecoilState(selectShopsState);

  useEffect(() => {
    kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setMyLocation((prev) => {
            return { ...prev, center: { lat, lng }, isLoading: false };
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    if (map && myLocation.center.lat && myLocation.center.lng) {
      const searchPlaces = () => {
        const ps = new kakao.maps.services.Places();
        const keyword = "의류판매";
        const options = {
          location: new kakao.maps.LatLng(
            myLocation.center.lat,
            myLocation.center.lng
          ),
          sort: kakao.maps.services.SortBy.DISTANCE,
        };
        ps.keywordSearch(keyword, placesSearchCB, options);
      };
      const placesSearchCB = (data: any, status: string, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setSelectShops(data);
          displayPlaces(data);
        }
      };
      const displayPlaces = (data: any) => {
        const bounds = new kakao.maps.LatLngBounds();
        let markers: any = [];
        data.forEach((place: any) => {
          markers.push({
            position: {
              lat: place.y,
              lng: place.x,
            },
          });
        });
        setMarkers(markers);
        // map.setBounds(bounds);
      };
      searchPlaces();
    }
  }, [map, myLocation]);

  return (
    <S.Container>
      <S.SideContainer>
        <SearchContainer />
      </S.SideContainer>
      <main>
        <Map
          center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
          style={{ width: "100%", height: "100vh" }}
          onCreate={setMap}
        >
          {markers?.map((marker: MarkersType) => {
            return (
              <MapMarker
                key={`marker-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
              />
            );
          })}
          {!myLocation.isLoading && (
            <MapMarker
              position={myLocation.center}
              image={{
                src: "/myPositionMarker.png",
                size: {
                  width: 50,
                  height: 50,
                },
              }}
            />
          )}
        </Map>
      </main>
    </S.Container>
  );
};

export default Main;

const S = {
  Container: styled.div``,
  SideContainer: styled.aside`
    position: absolute;
    left: 0;
    top: 0;
    width: 360px;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
  `,

  SearchResultsContainer: styled.div``,
};

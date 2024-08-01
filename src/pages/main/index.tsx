"use client";
import HeaderContainer from "@/components/HeaderContainer";
import { selectShopsState} from "@/globalState/recoilState";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MyLocation from "@/assets/MyLocation.svg";
import ContentsContainer from "@/components/ContentsContainer";
import { MarkersType, PlaceType } from "@/types/placeType";

declare global {
  interface Window {
    kakao: any;
  }
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
  const [markers, setMarkers] = useState<MarkersType[]>([]);
  const [selectShops, setSelectShops] = useRecoilState<PlaceType[]>(selectShopsState);

  console.log(myLocation)

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

  return (
    <S.Container>
      <S.SideContainer>
        <HeaderContainer />
        <ContentsContainer/>
      </S.SideContainer>
      <main>
        <Map
          center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
          style={{ width: "100%", height: "100vh" }}
          onCreate={setMap}
        >
          {markers?.map((marker, index) => (
            <MapMarker
              key={`marker-${marker.position.lat},${marker.position.lng}-${index}`}
              position={marker.position}
            />
          ))}
          {!myLocation.isLoading && (
            <MapMarker
              position={myLocation.center}
              image={{
                src: `${<MyLocation/>}`,
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
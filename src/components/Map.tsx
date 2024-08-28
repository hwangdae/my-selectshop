import {
  markersState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import MyLocationMaker from "./MyLocationMaker";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

const MapComponent = () => {
  const [map, setMap] = useState<any>();
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const markers = useRecoilValue(markersState);
  const selectshops = useRecoilValue(selectShopsState);
  console.log(markers);
  console.log(selectshops);
  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
          var geocoder = new kakao.maps.services.Geocoder();
          console.log(geocoder);
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setMyLocation((prev) => ({
              ...prev,
              center: { lat, lng },
              isLoading: false,
            }));
          });
        }
      });
    }
  }, []);

  return (
    <Map
      center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
      style={{ width: "100%", height: "100%" }}
      onCreate={setMap}
    >
      {markers.map((marker, index) => (
        <CustomOverlayMap
          key={`marker-${marker.position.lat},${marker.position.lng}-${index}`}
          position={marker.position}
        >
          <S.MarkerWrap>
            <S.SelectshopInfoWindow>
              {selectshops[index]?.place_name}
            </S.SelectshopInfoWindow>
          </S.MarkerWrap>
        </CustomOverlayMap>
      ))}
      {!myLocation.isLoading && <MyLocationMaker myLocation={myLocation} />}
    </Map>
  );
};

export default MapComponent;

const S = {
  MarkerWrap: styled.div`
    position: relative;
    left: 0px;
    bottom: 0px;
    padding: 8px 30px;
    border: solid 2px ${styleColor.RED[0]};
    border-radius: 20px;
    background: #fff;
    z-index: 99;
    &::before {
      display: block;
      content: "";
      width: 6px;
      height: 6px;
      border-right: 2px solid ${styleColor.RED[0]};
      border-bottom: 2px solid ${styleColor.RED[0]};
      transform: rotate(45deg);
      background-color: #fff;
      position: absolute;
      bottom: -5px;
      left: 50%;
      margin-left: -3px;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 50%;
      bottom: -10px;
      margin-left: -5px;
      width: 10px;
      height: 3px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(3px);
      z-index: -999;
    }
  `,
  SelectshopInfoWindow: styled.p`
    ${styleFont.textMedium}
    font-weight: 600;
  `,
};

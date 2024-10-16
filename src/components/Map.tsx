import {
  boundsState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import MyLocationMaker from "./MyLocationMaker";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import MarkerContainer from "./MarkerContainer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/api/review";
import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";

const MapComponent = () => {
  const [map, setMap] = useState<any>();
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const selectshops = useRecoilValue(selectShopsState);
  const bounds = useRecoilValue(boundsState);

  const router = useRouter()
  const {tab} = router.query

  const { data: reviewData} = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    refetchOnWindowFocus: false,
  });

  const visitedSelectshops = selectshops?.filter((selectshop: PlaceType) => 
    reviewData?.some((review: ReviewType) => review.selectshopId === selectshop.id)
  );

  const notVisitedSelectshops = selectshops?.filter((selectshop: PlaceType) =>
    !reviewData?.some(
      (review: ReviewType) => review.selectshopId === selectshop.id
    )
  );

  useEffect(() => {
    if (map && bounds) {
      map.setBounds(bounds);
    }
  }, [map, bounds]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
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

  const renderContent = () => {
    if(tab === "nearbySelectshop"){
      return selectshops
    }else if(tab === "visitedSelectshop"){
      return visitedSelectshops
    }else{
      return notVisitedSelectshops
    }
  }

  return (
    <Map
      id="map"
      center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
      style={{ width: "100%", height: "100%" }}
      onCreate={setMap}
    >
      {renderContent().map((selectshop, index) => (
        <MarkerContainer selectshop={selectshop} index={index} />
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

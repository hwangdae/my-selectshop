import { MyLocationType } from "@/globalState/recoilState";
import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

interface PropsType {
  myLocation: MyLocationType;
}

const MyLocationMaker = ({ myLocation }: PropsType) => {
  return (
    <MapMarker
      position={myLocation.center}
      image={{
        src: "images/MyLocation.png",
        size: {
          width: 60,
          height: 60,
        },
      }}
    />
  );
};

export default MyLocationMaker;

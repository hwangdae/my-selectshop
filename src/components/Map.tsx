import {
  mapState,
  markersState,
  myLocationState,
} from "@/globalState/recoilState";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import MyLocationMaker from "./MyLocationMaker";

const MapComponent = () => {
  const [_, setMap] = useRecoilState(mapState);
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const markers = useRecoilValue(markersState);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
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

  return (
    <Map
      center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
      style={{ width: "100%", height: "100%" }}
      // onCreate={setMap}
    >
      {markers.map((marker, index) => (
        <MapMarker
          key={`marker-${marker.position.lat},${marker.position.lng}-${index}`}
          position={marker.position}
        />
      ))}
      {!myLocation.isLoading && <MyLocationMaker myLocation={myLocation} />}
    </Map>
  );
};

export default MapComponent;

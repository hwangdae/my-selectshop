import { boundsState, myLocationState } from "@/globalState/recoilState";
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import MyLocationMaker from "./MyLocationMaker";
import RenderMarkers from "./RenderMarkers";

const MapComponent = () => {
  const [map, setMap] = useState<any>();
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const bounds = useRecoilValue(boundsState);

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

  return (
    <Map
      id="map"
      center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
      style={{ width: "100%", height: "100%" }}
      onCreate={setMap}
    >
      <RenderMarkers />
      {!myLocation.isLoading && <MyLocationMaker myLocation={myLocation} />}
    </Map>
  );
};

export default MapComponent;

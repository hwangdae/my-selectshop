import { myLocationState } from '@/globalState/recoilState';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

const MapComponent = () => {
    const [myLocation, setMyLocation] = useRecoilState(myLocationState);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <Map
      center={{ lat: myLocation.center.lat, lng: myLocation.center.lng }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* {markers.map((marker, index) => (
        <MapMarker
          key={`marker-${marker.position.lat},${marker.position.lng}-${index}`}
          position={marker.position}
        />
      ))} */}
      {!myLocation.isLoading && (
        <MapMarker
          position={myLocation.center}
          image={{
            src: '/assets/MyLocation.svg', // 적절한 경로로 수정하세요
            size: {
              width: 50,
              height: 50,
            },
          }}
        />
      )}
    </Map>
  );
};

export default MapComponent;
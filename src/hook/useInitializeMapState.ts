import { boundsState } from "@/globalState/recoilState";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const useInitializeMapState = (y: number, x: number, type? : string) => {
  const [, setBounds] = useRecoilState<any>(boundsState);

  useEffect(() => {
    const bounds = new kakao.maps.LatLngBounds();
    const position = new kakao.maps.LatLng(y, x);
    bounds.extend(position);
    setBounds(bounds);
  }, [setBounds]);
};

export default useInitializeMapState;

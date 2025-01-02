import { boundsState } from "@/globalState/recoilState";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const useInitializeMapState = (y: number, x: number) => {
  const [, setBounds] = useRecoilState<any>(boundsState);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services && y && x
    ) {
      let bounds = new kakao.maps.LatLngBounds();
      let position = new kakao.maps.LatLng(y, x);
      bounds.extend(position);
      setBounds(bounds);
    }
  }, [setBounds,x,y]);
};

export default useInitializeMapState;

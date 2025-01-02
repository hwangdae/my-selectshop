import { boundsState } from "@/globalState/recoilState";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const useInitializeMapState = (y: number, x: number,type:string) => {
  const [, setBounds] = useRecoilState<any>(boundsState);

  useEffect(() => {
    if (
      type === "bestReviewerList" &&
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      let bounds = new kakao.maps.LatLngBounds();
      let position = new kakao.maps.LatLng(y, x);
      bounds.extend(position);
      setBounds(bounds);
    }
  }, [setBounds]);
};

export default useInitializeMapState;

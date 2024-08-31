import { getReview } from "@/api/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { MarkersType, PlaceType } from "@/types/placeType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface Propstype {
    selectshop : PlaceType;
    index : number
}

const MarkerContainer = ({selectshop,index}:Propstype) => {
    const { id, place_name, address_name, phone, distance,x,y } = selectshop;
    const position = {lat:y,lng:x}

    const { data: reviewData }:any = useQuery({
        queryKey: ["review", id],
        queryFn: () => getReview(id),
        enabled : !!id
      });

  return (
    <CustomOverlayMap
      key={`marker-${y},${x}-${index}`}
      position={position}
    >
      <S.MarkerWrap>
        <S.SelectshopInfoWindow>
          {place_name}
          {reviewData.length}
        </S.SelectshopInfoWindow>
      </S.MarkerWrap>
    </CustomOverlayMap>
  );
};

export default MarkerContainer;

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
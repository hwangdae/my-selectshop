import useKakaoSearch from "@/hook/useKakaoSearch";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { ReviewType } from "@/types/reviewType";
import React, { useEffect } from "react";
import styled from "styled-components";

interface PropsType {
  selectshopId: string;
}

const SelectshopTitleContainer = ({ selectshopId }: PropsType) => {
  const { searchAllPlaces, selectshops, myLocation } = useKakaoSearch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (myLocation.center.lat && myLocation.center.lng) {
        searchAllPlaces();
      }
    }
  }, []);

  return (
    <>
      {selectshops
        .filter((v) => {
          return v.id === selectshopId;
        })
        .map((v) => {
          return (
            <S.SelectshopTitleContainer>
              <S.PlaceName>{v.place_name}</S.PlaceName>
              <S.SelectshopDistance>
                {v.distance >= 1000
                  ? `${(v.distance / 1000).toFixed(1)}km`
                  : `${v.distance}m`}
              </S.SelectshopDistance>
            </S.SelectshopTitleContainer>
          );
        })}
    </>
  );
};

export default SelectshopTitleContainer;

const S = {
  SelectshopTitleContainer : styled.div`
    display: flex;
  `,
  PlaceName: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
    margin-bottom: 10px;
  `,
    SelectshopDistance: styled.span`
    ${styleFont.text.txt_sm};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
    margin-left: 6px;
  `,
};

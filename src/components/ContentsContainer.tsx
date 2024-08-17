"use client";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileContainer from "./ProfileContainer";
import { useRecoilValue } from "recoil";
import { myLocationState } from "@/globalState/recoilState";

const CONTENTSTABNAV = [
  { id: "nearbySelectShop", name: "편집샵 보기" },
  { id: "visitedSelectshop", name: "방문한 편집샵 보기" },
  { id: "notVisiteSelectshop", name: "방문하지 못한 편집샵 보기" },
  { id: "BookmarkSelectshop", name: "즐겨찾기" },
];

const ContentsContainer = () => {
  const myLocaion = useRecoilValue(myLocationState);
  const [myAddress,setMyAddress] = useState<string>("")
  const router = useRouter();
  console.log(myLocaion);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      var geocoder = new kakao.maps.services.Geocoder();

      var callback = function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          setMyAddress(result[0].address_name)
          console.log(result[0].address_name);
        }
      };

      geocoder.coord2RegionCode(
        myLocaion.center.lng,
        myLocaion.center.lat,
        callback
      );
    }
  }, [myLocaion]);
  const viewSelectShopHandle = (id: string) => {
    router.push(`/?tab=${id}`);
  };

  return (
    <S.ContentsContainer>
      <ProfileContainer />
      <h1>{myAddress}</h1>
      <S.ContentsInner>
        {CONTENTSTABNAV.map((content) => {
          return (
            <S.Content key={content.id}>
              <S.ContentButton onClick={() => viewSelectShopHandle(content.id)}>
                {content.name}
              </S.ContentButton>
            </S.Content>
          );
        })}
      </S.ContentsInner>
    </S.ContentsContainer>
  );
};

export default ContentsContainer;

const S = {
  ContentsContainer: styled.ul`
    width: 100%;
  `,

  ContentsInner: styled.div`
    padding: 20px 12px;
  `,
  Content: styled.li`
    margin-bottom: 8px;
  `,
  ContentButton: styled.button`
    cursor: pointer;
    width: 100%;
    border: solid 1px ${styleColor.RED[0]};
    border-radius: 4px;
    padding: 12px 0px;
    ${styleFont.textMedium}
    text-align: left;
    text-indent: 10px;
  `,
};

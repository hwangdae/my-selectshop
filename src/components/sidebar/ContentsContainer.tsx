import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileContainer from "../profileComponents/ProfileContainer";
import MyAddressContainer from "./MyAddressContainer";

const CONTENTSTABNAV = [
  { id: "nearbySelectshop", name: "편집샵 보기" },
  { id: "visitedSelectshop", name: "방문한 편집샵 보기" },
  { id: "notVisiteSelectshop", name: "방문하지 못한 편집샵 보기" },
  { id: "BookmarkSelectshop", name: "즐겨찾기" },
];

const ContentsContainer = () => {

  const router = useRouter();
  
  const viewSelectShopHandle = (id: string) => {
    router.push(`/?tab=${id}`);
  };

  return (
    <S.ContentsContainer>
      <ProfileContainer />
      <MyAddressContainer/>
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

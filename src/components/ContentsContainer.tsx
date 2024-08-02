"use client";
import { getUser } from "@/api/user";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ProfileUpdate from "@/assets/ProfileUpdate.svg";
import ProfileContainer from "./ProfileContainer";

const CONTENTSTABNAV = [
  { id: "nearbySelectShop", name: "편집샵 보기" },
  { id: "visitedSelectshop", name: "방문한 편집샵 보기" },
  { id: "notVisiteSelectshop", name: "방문하지 못한 편집샵 보기" },
  { id: "BookmarkSelectshop", name: "즐겨찾기" },
];

const ContentsContainer = () => {
  const router = useRouter();
  console.log(router,"라우터")
  const viewSelectShopHandle = (id: string) => {
    router.push(`/?tab=${id}`);
  };

  return (
    <S.ContentsContainer>
      <ProfileContainer />
      <S.ContentsInner>
        {CONTENTSTABNAV.map((content) => {
          return (
            <S.Content key={content.id}>
              <S.ContentButton
                onClick={() => viewSelectShopHandle(content.id)}
              >
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

    /* height: calc(100vh - 183px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    } */
  `,

  ContentsInner: styled.div`
    padding: 20px 12px;
  `,
  Content: styled.li`
    /* width: 100%; */
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

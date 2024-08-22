import React from "react";
import styled from "styled-components";
import HeaderContainer from "./HeaderContainer";
import ContentsContainer from "./ContentsContainer";
import { useRouter } from "next/router";
import NearbySelectshop from "@/pages/nearbySelectshop";
import VisitedSelectShop from "@/pages/visitedSelectshop";


const Sidebar = () => {
  const router = useRouter();
  const { tab } = router.query;

  const renderContent = () => {
    switch (tab) {
      case "nearbySelectShop":
        return <NearbySelectshop />;
      case "visitedSelectshop":
        return <VisitedSelectShop />;
      default:
        return <ContentsContainer />;
    }
  };
  return (
    <S.SideContainer>
      <S.StyleHeader>
        <HeaderContainer />
      </S.StyleHeader>
      <S.StyleContent>{renderContent()}</S.StyleContent>
    </S.SideContainer>
  );
};

export default Sidebar;

const S = {
  SideContainer: styled.aside`
    position: absolute;
    left: 0;
    top: 0;
    width: 360px;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
    /* overflow-y: auto; */
  `,
  StyleHeader: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  `,
  StyleContent: styled.div`
    /* flex: 1; */
    margin-top: 137.5px;
    height: calc(100vh - 137.5px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

import React from "react";
import styled from "styled-components";
import HeaderContainer from "./HeaderContainer";
import ContentsContainer from "./ContentsContainer";
import SearchResults from "@/pages/searchResults";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();
    const { tab } = router.query;

    const renderContent = () => {
        switch (tab) {
            case 'searchResults':
                return <SearchResults/>;
            // case 'visitedSelectshop':
            //     return <VisitedSelectshop/>;
            default:
                return <ContentsContainer />
        }
    }
  return (
    <S.SideContainer>
      <HeaderContainer />
      {renderContent()}
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
    overflow-y: auto;
  `,
  SearchResultsContainer: styled.div`
    flex: 1;
    overflow-y: auto;
  `,
};

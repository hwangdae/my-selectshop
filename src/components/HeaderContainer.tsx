import MySelectShop from "@/pages/mySelectShop";
import SearchResults from "@/pages/searchResults";
import { styleFont } from "@/styles/styleFont";
import { useState } from "react";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import { TabMenuType } from "@/types/utilType";
import { styleColor } from "@/styles/styleColor";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";

const TABNAV = [
  {
    id: 0,
    name: "검색",
    href: "/searchResults",
  },
  { id: 1, name: "내 셀렉샵", href: "/mySelectshop" },
];

const HeaderContainer = () => {
  const [step, setStep] = useState<number>(0);
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const router = useRouter();
  console.log(router);

  const searchSelectshopButton = async (e: any) => {};

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderTop>
          <S.Logo>MySelectshop</S.Logo>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                {
                  pathname: "/login",
                  query: { path: router.pathname },
                },
                "/login"
              )
            }
          >
            로그인
          </Button>
        </S.HeaderTop>
        <S.SearchForm onSubmit={searchSelectshopButton}>
          <S.SearchInput
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="찾으시는 셀렉샵 있으신가요?"
          />
          <S.SearchButton>
            <Search fill="#919191" />
          </S.SearchButton>
        </S.SearchForm>
        <S.SearchTabMenu>
          {TABNAV.map((item: TabMenuType) => {
            return (
              <S.TabMenuItem key={item.id}>
                <S.TabMenuButton
                  step={step}
                  id={item.id}
                  onClick={() => {
                    item.id === 0 ? setStep(0) : setStep(1);
                  }}
                >
                  {item.name}
                </S.TabMenuButton>
              </S.TabMenuItem>
            );
          })}
        </S.SearchTabMenu>
      </S.HeaderInner>
      <S.SearchResultsContainer>
        {step === 0 ? <SearchResults /> : <MySelectShop />}
      </S.SearchResultsContainer>
    </S.HeaderContainer>
  );
};

export default HeaderContainer;

const S = {
  HeaderContainer: styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
  `,
  HeaderInner: styled.div`
    padding: 20px;
    background-color: #b76371;
  `,
  HeaderTop: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  Logo: styled.h1`
    ${styleFont.textLarge}
    font-weight: bold;
    color: #fff;
  `,
  SearchForm: styled.form`
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  SearchInput: styled.input`
    width: 94%;
    outline: none;
    border: none;
    padding: 14px;
    border-radius: 5px;
    &::placeholder {
      font-size: 15px;
      font-weight: bold;
      color: #919191;
      letter-spacing: -1px;
    }
  `,
  SearchButton: styled.button`
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -15px;
  `,
  SearchTabMenu: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 20px;
  `,
  TabMenuItem: styled.li`
    width: 50%;
    display: block;
  `,
  TabMenuButton: styled.button<{ step: number; id: number }>`
    cursor: pointer;
    width: 100%;
    padding: 10px 0px;
    border-radius: 22px;
    background-color: ${(props) =>
      props.step === props.id ? `${styleColor.BROWN[100]}` : "none"};
    color: ${(props) => (props.step === props.id ? "#fff" : "#111")};
    /* font-weight: ${(props) =>
      props.step === props.id ? "bold" : "nomal"}; */
    font-weight: bold;
  `,
  SearchResultsContainer: styled.div`
    width: 100%;
    height: calc(100vh - 183px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Aaaa: styled.div`
    position: absolute;
    left: 360px;
    top: 0;
    width: 100px;
    height: 100%;
    background-color: #fff;
  `,
};

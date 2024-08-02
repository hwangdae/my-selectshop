import MySelectShop from "@/pages/mySelectShop";
import SearchResults from "@/pages/nearbySelectShop";
import { styleFont } from "@/styles/styleFont";
import { useState } from "react";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import { TabMenuType } from "@/types/utilType";
import { styleColor } from "@/styles/styleColor";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";

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
  const loginUser = useLoginUserId();

  const router = useRouter();

  const logoutHandleSubmit = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const searchSelectshopButton = async (e: any) => {};



  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderTop>
          <S.Logo>MySelectshop</S.Logo>
          {!loginUser ? (
            <Button
              variant="contained"
              sx={{ padding: "5px 30px" }}
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
          ) : (
            <Button
              variant="contained"
              sx={{ padding: "5px 30px" }}
              onClick={logoutHandleSubmit}
            >
              로그아웃
            </Button>
          )}
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
      </S.HeaderInner>
      
    </S.HeaderContainer>
  );
};

export default HeaderContainer;

const S = {
  HeaderContainer: styled.div`
    width: 100%;
    /* height: 100vh; */
    /* position: absolute; */
    left: 0;
    top: 0;
  `,
  HeaderInner: styled.div`
    padding: 20px 12px;
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
 
  Aaaa: styled.div`
    position: absolute;
    left: 360px;
    top: 0;
    width: 100px;
    height: 100%;
    background-color: #fff;
  `,
};

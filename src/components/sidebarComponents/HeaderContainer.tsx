import { styleFont } from "@/styles/styleFont";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useLoginUserId from "@/hook/useLoginUserId";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  boundsState,
  myLocationState,
  selectShopsState,
} from "@/globalState/recoilState";
import { PlaceType } from "@/types/placeType";
import { logOut } from "@/api/user";

const HeaderContainer = () => {
  const [searchName, setSearchName] = useState("");
  const myLocation = useRecoilValue(myLocationState);
  const [, setBounds] = useRecoilState<any>(boundsState);
  const [, setSelectshops] = useRecoilState<PlaceType[]>(selectShopsState);
  const loginUser = useLoginUserId();

  const router = useRouter();

  const handleLogoClick = () => {
    setSelectshops([]);
    router.push("/");
    const bounds = new kakao.maps.LatLngBounds();
    const position = new kakao.maps.LatLng(
      myLocation.center.lat,
      myLocation.center.lng
    );
    bounds.extend(position);
    setBounds(bounds);
  };

  const logoutHandleSubmit = async () => {
    try {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        await logOut();
        alert("로그아웃 되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchSelectshopButton = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push({ pathname:"nearbySelectshop", query: {name :`${searchName}`}  });
  };

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderTop>
          <S.Logo>
            <button onClick={() => handleLogoClick()}>MySelectshop</button>
          </S.Logo>
          {!loginUser ? (
            <Button
              variant="contained"
              sx={{ padding: "5px 30px" }}
              onClick={() => router.push("?modal=login")}
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
    button {
      cursor: pointer;
      ${styleFont.textLarge}
      font-weight: bold;
      color: #fff;
    }
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
    border-radius: 4px;
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
};

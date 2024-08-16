import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useState } from "react";
import styled from "styled-components";
import Indent from "@/assets/Indent.svg";
import { PlaceType } from "@/types/placeType";
import { Button } from "@mui/material";
import SelectShopBookmark from "./SelectShopBookmark";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/api/review";

interface PropsType {
  selectShop: PlaceType;
}

const SelectshopInfo = ({ selectShop }: PropsType) => {
  const { id, place_name, address_name, phone } = selectShop;
  const [detailSelectshopInfoToggle, setDetailSelectshopInfoToggle] = useState<
    string | null
  >(null);
  const router = useRouter();

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: getReview,
  });

  const detailSelectshopInfoHandler = (id: string) => {
    setDetailSelectshopInfoToggle(id);
  };

  return (
    <>
      <S.Selectshop>
        <S.SelectshopInfo>
          <S.SelectshopName>{place_name}</S.SelectshopName>
          <S.SelectshopAddressName>{address_name}</S.SelectshopAddressName>
          <S.SelectshopPhone>{phone}</S.SelectshopPhone>
        </S.SelectshopInfo>
        <S.SelectshopFn>
          <S.SelectshopMoreInfoButton
            onClick={() => {
              detailSelectshopInfoHandler(id);
            }}
          >
            <Indent />
          </S.SelectshopMoreInfoButton>
          <SelectShopBookmark id={id} />
        </S.SelectshopFn>
      </S.Selectshop>
      {detailSelectshopInfoToggle === id && (
        <S.DetailContainer>
          <S.DetailSelectshopInfo>
            <S.DetailSelectshopName>{place_name}</S.DetailSelectshopName>
            <S.DetailImage></S.DetailImage>
            <S.DetailAddress>위치 {address_name}</S.DetailAddress>
          </S.DetailSelectshopInfo>
          <S.SelectshopReviewContainer>
            <S.SelectshopReviewTitle>나의 후기</S.SelectshopReviewTitle>
            <S.MySelectshopReview>
              <S.NoReview>등록된 후기가 없습니다.</S.NoReview>
              <Button
                onClick={() =>
                  router.push(
                    { pathname: "/writeReview", query: { id } },
                    "/writeReview"
                  )
                }
                variant="contained"
                sx={{ padding: "5px 30px" }}
              >
                후기 등록하기
              </Button>
            </S.MySelectshopReview>
          </S.SelectshopReviewContainer>
        </S.DetailContainer>
      )}
    </>
  );
};

export default SelectshopInfo;
const S = {
  Selectshop: styled.li`
    display: flex;
    justify-content: space-between;
    padding: 20px 18px;
    margin: 20px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `,
  SelectshopInfo: styled.div`
    width: 65%;
  `,
  SelectshopName: styled.h1`
    ${styleFont.textLarge}
    margin-bottom: 14px;
  `,
  SelectshopAddressName: styled.h2`
    ${styleFont.textMedium}
    margin-bottom: 6px;
  `,
  SelectshopPhone: styled.p``,
  SelectshopFn: styled.div``,
  SelectshopMoreInfoButton: styled.button`
    cursor: pointer;
  `,
  SelectshopFavoritesButton: styled.button`
    cursor: pointer;
  `,
  //디테일 부분
  DetailContainer: styled.div`
    position: absolute;
    left: 360px;
    top: 0px;
    background-color: #fff;
    width: 300px;
    height: 100vh;
    z-index: 999;
  `,
  DetailSelectshopInfo: styled.div``,
  DetailSelectshopName: styled.h1`
    text-indent: 6px;
    padding: 14px 0px;
    ${styleFont.textLarge}
    background-color: ${styleColor.RED[0]};
  `,
  DetailImage: styled.h2`
    width: 100%;
    height: 147px;
    background-color: #666;
  `,
  DetailAddress: styled.p``,
  SelectshopReviewContainer: styled.div`
    border-top: solid 1px #999;
  `,
  SelectshopReviewTitle: styled.h1`
    ${styleFont.textLarge}
    margin-bottom: 30px;
  `,
  MySelectshopReview: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  NoReview: styled.p`
    ${styleFont.textMedium}
    margin-bottom: 10px;
  `,
  WriteReviewButton: styled.button``,
};

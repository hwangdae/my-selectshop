import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useState } from "react";
import styled from "styled-components";
import Indent from "@/assets/Indent.svg"
import Star from "@/assets/Star.svg"
import { PlaceType } from "@/types/placeType";


interface PropsType {
  Selectshop: PlaceType;
}

const SelectshopInfo = ({ Selectshop }: PropsType) => {
  const { id, place_name, address_name, phone } = Selectshop;
  const [detailSelectshopInfoToggle, setDetailSelectshopInfoToggle] = useState(false);
  const [favoritesToggle, setFavoritesToggle] = useState(false);

  const detailSelectshopInfoHandler = () => {
    setDetailSelectshopInfoToggle(!detailSelectshopInfoToggle);
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
          <S.SelectshopMoreInfoButton onClick={detailSelectshopInfoHandler}>
            <Indent />
          </S.SelectshopMoreInfoButton>

          <S.SelectshopFavoritesButton
            onClick={() => setFavoritesToggle(!favoritesToggle)}
          >
            <Star
              fill={favoritesToggle ? `${styleColor.BROWN[0]}` : "current"}
            />
          </S.SelectshopFavoritesButton>
        </S.SelectshopFn>
      </S.Selectshop>
      {detailSelectshopInfoToggle && (
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
              <S.WriteReview>후기 작성하기</S.WriteReview>
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
  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
    background-color: ${styleColor.INDIGO[100]};
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
  `,
  MySelectshopReview: styled.div``,
  NoReview: styled.p``,
  WriteReview: styled.button``,
};

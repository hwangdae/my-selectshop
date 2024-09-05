import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlaceType } from "@/types/placeType";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/api/review";
import PatchCheck from "@/assets/PatchCheck.svg";
import FullfillPatchCheck from "@/assets/FullfillPatchCheck.svg";
import useLoginUserId from "@/hook/useLoginUserId";
import { useRecoilState } from "recoil";
import { boundsState } from "@/globalState/recoilState";
import MyReview from "./MyReview";
import { ReviewType } from "@/types/reviewType";

interface PropsType {
  selectShop: PlaceType;
}

const SelectshopInfo = ({ selectShop }: PropsType) => {
  const { id, place_name, address_name, phone, distance,x,y } = selectShop;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [_,setBounds] = useRecoilState<any>(boundsState)
  const loginUser = useLoginUserId();
  const router = useRouter();
  const position = { lat: y, lng: x };

  const { data: reviewData } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id),
    enabled : !!id
  });

  useEffect(()=>{
    if (selectedId === id) {
    if(typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps){
        const bounds = new kakao.maps.LatLngBounds();
        const position = new kakao.maps.LatLng(y, x);
      
        bounds.extend(position);
        setBounds(bounds);
    }}
  },[selectedId, id, x, y, setBounds])

  const detailSelectshopInfoHandler = () => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const review = reviewData?.find((review: ReviewType) => {
    return review?.selectshopId === id && review?.userId === loginUser;
  });

  return (
    <>
      <S.SelectshopContainer onClick={detailSelectshopInfoHandler}>
        <S.SlectshopContents>
          <S.SelectshopInfo>
            <S.SelectshopName>
              {place_name}
              <S.SelectshopDistance>
                {distance >= 1000
                  ? `${(distance / 1000).toFixed(1)}km`
                  : `${distance}m`}
              </S.SelectshopDistance>
            </S.SelectshopName>
            <S.SelectshopAddressName>{address_name}</S.SelectshopAddressName>
            <S.SelectshopPhone>{phone}</S.SelectshopPhone>
          </S.SelectshopInfo>
          <S.SelectshopFn>
            <S.SelectshopMoreInfoButton>
              {review ? (
                <FullfillPatchCheck
                  width={"18px"}
                  height={"18px"}
                  fill={`${styleColor.RED[0]}`}
                />
              ) : (
                <PatchCheck width={"18px"} height={"18px"} />
              )}
            </S.SelectshopMoreInfoButton>
          </S.SelectshopFn>
        </S.SlectshopContents>
        {review && (
          <S.PreviewReviewContainer>
            <S.PreviewReviewTitle>나의 후기</S.PreviewReviewTitle>
            <S.PreviewReviewDescription>
              {review?.description}
            </S.PreviewReviewDescription>
          </S.PreviewReviewContainer>
        )}
      </S.SelectshopContainer>
      {selectedId === id && (
        <S.DetailContainer>
          <S.DetailSelectshopName>{place_name}</S.DetailSelectshopName>
          {review ? (
            <MyReview review={review}/>
          ) : (
            <>
              <S.DetailSelectshopInfo>
                <S.DetailAddress>위치 {address_name}</S.DetailAddress>
              </S.DetailSelectshopInfo>
              <S.SelectshopReviewContainer>
                <S.SelectshopReviewTitle>나의 후기</S.SelectshopReviewTitle>
                <S.MySelectshopReview>
                  <S.NoReview>등록된 후기가 없습니다.</S.NoReview>
                  <Button
                    onClick={() =>{
                      if(!loginUser){
                        alert('로그인이 필요한 서비스 입니다.')
                        return ;}
                      router.push(
                        { pathname: "/writeReview", query: { id } },
                        "/writeReview"
                      )
                    }}
                    variant="contained"
                    sx={{ padding: "5px 30px" }}
                  >
                    후기 등록하기
                  </Button>
                </S.MySelectshopReview>
              </S.SelectshopReviewContainer>
            </>
          )}
        </S.DetailContainer>
      )}
    </>
  );
};

export default SelectshopInfo;

const S = {
  SelectshopContainer: styled.li`
    cursor: pointer;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 20px 18px;
    margin: 20px;
  `,
  SlectshopContents: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  SelectshopInfo: styled.div`
    width: 85%;
  `,
  SelectshopName: styled.h1`
    display: flex;
    align-items: center;
    ${styleFont.textLarge};
    margin-bottom: 14px;
  `,
  SelectshopDistance: styled.span`
    ${styleFont.textsmall};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
    margin-left: 6px;
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
  //프리뷰 리뷰
  PreviewReviewContainer: styled.div`
    border-radius: 4px;
    background-color: ${styleColor.GRAY[0]};
    margin-top: 10px;
    padding: 10px;
  `,
  PreviewReviewTitle: styled.h2`
    ${styleFont.textMedium}
    color: ${styleColor.RED[100]};
    font-weight: bold;
  `,
  PreviewReviewDescription: styled.p`
    ${styleFont.textsmall}
    font-weight: 400;
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  // 나의 리뷰
  
};

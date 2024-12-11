import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { ReviewType } from "@/types/reviewType";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { PlaceType } from "@/types/placeType";
import useInitializeMapState from "@/hook/useInitializeMapState";
import CommonSwiper from "./CommonSwiper";
import Tags from "./Tags";

interface PropsType {
  review: ReviewType & { shopInfo: PlaceType[] };
  nickName?: string;
  type?: string;
}

const MyReviewContainer = ({ review, nickName, type }: PropsType) => {
  const {
    reviewImages,
    description,
    advantages,
    disAdvantages,
    tags,
    shopInfo,
  } = review;

  if (type === "bestReviewerList") {
    useInitializeMapState(shopInfo?.y, shopInfo?.x);
  }

  return (
    <S.MyReviewContainer>
      <S.ImageWrap>
        {reviewImages === null || reviewImages === "" ? (
          <NoImage />
        ) : (
          <CommonSwiper slideImages={reviewImages} />
        )}
      </S.ImageWrap>
      <S.ReviewTextContainer>
        <S.ReviewTextRow>
          <S.ReviewTitle>
            📒 {type === "bestReviewerList" ? `${nickName}님의` : "나의"} 후기
          </S.ReviewTitle>
          <S.ReviewDescription>{description}</S.ReviewDescription>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👍 셀렉샵 장점</S.ReviewTitle>
          <ul>
            {advantages?.map((advantage: string, index) => {
              return <li key={`${advantage}-${index}`}>{advantage}</li>;
            })}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👎 설렉샵 단점</S.ReviewTitle>
          <ul>
            {disAdvantages?.map((disAdvantage: string, index) => {
              return <li key={`${disAdvantage}-${index}`}>{disAdvantage}</li>;
            })}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>🏷️ 태그</S.ReviewTitle>
          <Tags tags={tags} type={"myReview"} />
        </S.ReviewTextRow>
      </S.ReviewTextContainer>
    </S.MyReviewContainer>
  );
};

export default MyReviewContainer;

const S = {
  MyReviewContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  ImageWrap: styled.div`
    width: 300px;
  `,
  ReviewTextContainer: styled.ul`
    padding: 0px 12px;
  `,
  ReviewTextRow: styled.li`
    margin: 40px 0px;
    ul {
      list-style: disc;
      margin-left: 36px;
      li {
        margin-bottom: 7px;
        ${styleFont.text.txt_md}
      }
    }
  `,
  ReviewTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 500;
    margin-bottom: 15px;
  `,
  ReviewDescription: styled.p`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    border-radius: 4px;
  `,
  TagList: styled.ul`
    list-style: none !important ;
    li {
      position: relative;
      left: 0;
      top: 0;
      display: inline-block;
      background-color: ${styleColor.RED[0]};
      padding: 4px 10px;
      border-radius: 4px;
      text-indent: 4px;
      color: #fff !important;
      margin-right: 5px;
      &::before {
        position: absolute;
        left: 6px;
        top: 50%;
        margin-top: -3px;
        display: block;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 100%;
        background-color: #ffffff;
      }
    }
  `,
};

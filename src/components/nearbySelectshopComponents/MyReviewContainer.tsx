import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { ReviewType } from "@/types/reviewType";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import CommonSwiper from "./CommonSwiper";
import { PlaceType } from "@/types/placeType";
import useInitializeMapState from "@/hook/useInitializeMapState";

interface PropsType {
  review: ReviewType & {shopInfo : PlaceType[]};
}

const MyReviewContainer = ({ review }: PropsType) => {

  const { reviewImages, description, good, notGood, tags, shopInfo } = review;
  useInitializeMapState(shopInfo.y, shopInfo.x)


  return (
    <S.MyReviewContainer>
      <S.ImageWrap>
      {reviewImages === null || reviewImages === "" ? (
        <NoImage/>
      ) : (
        <CommonSwiper slideImages={reviewImages} />
      )}
      </S.ImageWrap>
      <S.ReviewTextContainer>
        <S.ReviewTextRow>
          <S.ReviewTitle>📒 나의 후기</S.ReviewTitle>
          <S.ReviewDescription>{description}</S.ReviewDescription>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👍 셀렉샵 장점</S.ReviewTitle>
          <ul>
            {good !== null ? (
              good?.split(",").map((good) => {
                return <li key={good}>{good}</li>;
              })
            ) : (
              <li>장점이 없어요</li>
            )}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👎 설렉샵 단점</S.ReviewTitle>
          <ul>
            {notGood !== null ? (
              notGood?.split(",").map((notGood) => {
                return <li key={notGood}>{notGood}</li>;
              })
            ) : (
              <li>단점이 없어요</li>
            )}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>🏷️ 태그</S.ReviewTitle>
          <S.TagList>
            {tags === null ? (
              <li>추천할 브랜드가 없어요</li>
            ) : (
              tags?.split(",").map((tag: string) => {
                return <li key={tag}>{tag}</li>;
              })
            )}
          </S.TagList>
        </S.ReviewTextRow>
      </S.ReviewTextContainer>
    </S.MyReviewContainer>
  );
};

export default MyReviewContainer;

const S = {
  MyReviewContainer : styled.div`
    position: absolute; left: 0; top: 46px;
  `,
  ImageWrap : styled.div`
    width: 300px;
    /* position: absolute; left: 0; top: 46px; */
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

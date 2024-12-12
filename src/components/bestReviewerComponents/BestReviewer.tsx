import { getAllUsersAndReviewCount } from "@/api/user";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfileContainer from "./UserProfileContainer";
import ReviewListContainer from "./ReviewListContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { ReviewType } from "@/types/reviewType";
import { PlaceType } from "@/types/placeType";
import { UserType } from "@/types/authType";
import { useRecoilValue } from "recoil";
import { myAddressState } from "@/globalState/recoilState";

const BestReviewer = () => {
  const [activeUserId, setActiveuserId] = useState<String>();
  const { searchAllPlaces, selectshops } = useKakaoSearch();
  const myAddress = useRecoilValue(myAddressState);

  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: () => getAllUsersAndReviewCount(),
  });

  useEffect(() => {
    searchAllPlaces();
  }, []);

  const sortedUsers = users
    ?.map((user: UserType) => {
      const filteredReviewCount = user!.reviews!.filter((v1: ReviewType) => {
        return selectshops.some((v2: PlaceType) => v2.id === v1.selectshopId);
      }).length;
      return { ...user, filteredReviewCount };
    })
    .sort((a, b) => b.filteredReviewCount - a.filteredReviewCount);

  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        {sortedUsers?.filter((user) => {
          return user.filteredReviewCount > 0;
        }).length === 0 ? (
          <S.NoBestReviewer>
            <span>🏆</span>
            <div>
              <p>{myAddress}</p>
              <p>베스트 리뷰어가 아직 없어요.</p>
            </div>
          </S.NoBestReviewer>
        ) : (
          <div>
            <S.BestReviewerTitleWrap>
              <S.Trophy>🏆</S.Trophy>
              <S.BestReviewerText>
                <S.BestReviewerAddress>{myAddress}</S.BestReviewerAddress>
                <h1>
                  <span>TOP 10</span> 베스트 리뷰어
                </h1>
              </S.BestReviewerText>
            </S.BestReviewerTitleWrap>
            <ul>
              {sortedUsers?.map((user: UserType, index: number) => {
                return (
                  user.filteredReviewCount !== 0 && (
                    <li key={user.id} onClick={() => setActiveuserId(user.id)}>
                      <UserProfileContainer user={user} index={index} />
                      {activeUserId === user.id && (
                        <ReviewListContainer
                          user={user}
                          selectshops={selectshops}
                        />
                      )}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        )}
      </S.InnerContainer>
    </S.BestReviewerContainer>
  );
};

export default BestReviewer;

const S = {
  BestReviewerContainer: styled.div`
    height: 100%;
  `,
  InnerContainer: styled.div`
    padding: 20px 12px;
    height: 100%;
  `,
  NoBestReviewer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
    span {
      font-size: 24px;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
      p:first-child {
        font-size: 12px;
      }
    }
  `,
  BestReviewerTitleWrap: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    ${styleFont.title.tit_lg}
  `,
  Trophy: styled.span`
    font-size: 28px;
  `,
  BestReviewerText: styled.div`
    span {
      color: ${styleColor.YELLOW.main};
      font-weight: 600;
    }
  `,
  BestReviewerAddress: styled.p`
    color: ${styleColor.GRAY[400]};
    font-size: 13px;
  `,
};

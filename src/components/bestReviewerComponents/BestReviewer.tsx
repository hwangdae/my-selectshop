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
            <S.BestReviewerTitle>
              <S.Trophy>🏆</S.Trophy>
              <div>
                <p>{myAddress}</p>
                <h1>
                  <span>TOP 10</span> 베스트 리뷰어
                </h1>
              </div>
            </S.BestReviewerTitle>
            <ul>
              {sortedUsers?.map((user: UserType) => {
                return (
                  <>
                    {user.filteredReviewCount !== 0 && (
                      <li onClick={() => setActiveuserId(user.id)}>
                        <UserProfileContainer key={user.id} user={user} />
                        {activeUserId === user.id && (
                          <ReviewListContainer
                            user={user}
                            selectshops={selectshops}
                          />
                        )}
                      </li>
                    )}
                  </>
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
    padding: 0px 12px;
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
      p {
        &:first-child {
          font-size: 15px;
        }
      }
    }
  `,
  BestReviewerTitle: styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px 30px 0px;
    ${styleFont.title.tit_lg}
    div {
      p {
        font-size: 15px;
      }
      span {
        color: ${styleColor.YELLOW.main};
        font-weight: 600;
      }
    }
  `,
  Trophy : styled.span`
    font-size: 28px;
  `,
};


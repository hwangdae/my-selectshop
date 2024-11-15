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

const BestReviewer = () => {
  const [activeUserId, setActiveuserId] = useState<String>();

  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: () => getAllUsersAndReviewCount(),
  });

  const { searchAllPlaces, selectshops } = useKakaoSearch();

  useEffect(() => {
    searchAllPlaces();
  }, []);

  const sortedUsers = users
    ?.map((user: UserType) => {
      const filteredReviewCount = user!.review!.filter((v1: ReviewType) => {
        return selectshops.some((v2: PlaceType) => v2.id === v1.selectshopId);
      }).length;
      return { ...user, filteredReviewCount };
    })
    .sort((a, b) => b.filteredReviewCount - a.filteredReviewCount);

  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        <S.Title>
          <span>🏆 TOP 10</span> 베스트 리뷰어
        </S.Title>
        <ul>
          {sortedUsers?.map((user: UserType) => {
            return (
              <li onClick={() => setActiveuserId(user.id)}>
                <UserProfileContainer key={user.id} user={user} />
                {activeUserId === user.id && (
                  <ReviewListContainer user={user} selectshops={selectshops} />
                )}
              </li>
            );
          })}
        </ul>
      </S.InnerContainer>
    </S.BestReviewerContainer>
  );
};

export default BestReviewer;

const S = {
  BestReviewerContainer: styled.div``,
  InnerContainer: styled.div`
    padding: 0px 12px;
  `,
  Title: styled.h1`
    margin: 20px 0px 30px 0px;
    ${styleFont.title.tit_lg}
    span {
      color: ${styleColor.YELLOW.main};
      font-weight: 700;
    }
  `,
};

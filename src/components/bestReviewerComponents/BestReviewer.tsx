import { getAllUsersAndReviewCount } from "@/api/user";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfileContainer from "./UserProfileContainer";
import ReviewListContainer from "./ReviewListContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";

const BestReviewer = () => {
  const [activeUserId, setActiveuserId] = useState();

  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: () => getAllUsersAndReviewCount(),
  });

  const { searchAllPlaces, selectshops } = useKakaoSearch();

  useEffect(() => {
    searchAllPlaces();
  }, []);

  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        <S.Title>
          <span>🏆 TOP 10</span> 베스트 리뷰어
        </S.Title>
        <ul>
          {users?.map((user) => {
            return (
              <li onClick={() => setActiveuserId(user.id)}>
                <UserProfileContainer key={user.id} user={user} selectshops={selectshops} />
                {activeUserId === user.id && <ReviewListContainer user={user} selectshops={selectshops} />}
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

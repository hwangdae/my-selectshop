import { followWhether, getAllFollowList } from "@/api/follow";
import useFollowMutate from "@/hook/useFollowMutate";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Check from "@/assets/Check.svg";
import { FollowType } from "@/types/followType";

interface PropsType {
  id: string;
  followList : any
}

const FollowContainer = ({ id,followList }: PropsType) => {
  const loginUser = useLoginUserId();
  const { followMutate, unFollowMutate } = useFollowMutate(loginUser, id);

  const router = useRouter();

  const isFollowing = followList?.find((v:any) => {
    return v.followee_id === id && v.follower_id === loginUser;
  });

  const followButtonHandler = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!loginUser) {
      alert("로그인이 필요한 서비스 입니다.");
      router.push("?modal=login");
      return;
    }
    if (isFollowing) {
      unFollowMutate.mutate();
    } else {
      followMutate.mutate({
        follower_id: loginUser,
        followee_id: id,
      });
    }
  };

  return (
    <S.FollowContainer>
      {loginUser !== id && (
        <S.FollowButton
          $followState={isFollowing}
          onClick={followButtonHandler}
        >
          {isFollowing ? (
            <S.Following>
              <Check
                width={"12px"}
                height={"12px"}
                fill={`${styleColor.GREEN.main}`}
              />
              팔로잉
            </S.Following>
          ) : (
            <p>팔로우</p>
          )}
        </S.FollowButton>
      )}
    </S.FollowContainer>
  );
};

export default FollowContainer;

const S = {
  FollowContainer: styled.div`
    width: 30%;
  `,
  FollowButton: styled.button<{ $followState: boolean | null | undefined }>`
    cursor: pointer;
    width: 100%;
    ${styleFont.text.txt_sm}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${styleColor.WHITE};
    padding: 7px 0px;
    border-radius: 4px;
    background-color: ${(props) =>
      props.$followState ? `${styleColor.BLACK}` : `${styleColor.RED.main}`};
  `,
  Following: styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: ${styleColor.GREEN.main};
  `,
};

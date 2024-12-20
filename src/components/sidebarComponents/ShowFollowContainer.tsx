import { getFollowerUsers, getFollowingUsers } from "@/api/follow";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import UserContainer from "../utilityComponents/UserContainer";
import { useRouter } from "next/router";
import styled from "styled-components";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { formatFollowCount } from "@/utilityFunction/formatFollowCount";
import People from "@/assets/People.svg";

interface PropsType {
  showFollow: boolean;
}
interface TabType {
  id: string;
  name: string;
  count: number | undefined;
}

const ShowFollowContainer = ({ showFollow }: PropsType) => {
  const loginUser = useLoginUserId();
  const router = useRouter();
  const { follow } = router.query;

  const { data: followerList } = useQuery({
    queryKey: ["follower"],
    queryFn: () => getFollowerUsers(loginUser),
    enabled: showFollow && !!loginUser,
  });

  const { data: followingList } = useQuery({
    queryKey: ["following"],
    queryFn: () => getFollowingUsers(loginUser),
    enabled: showFollow && !!loginUser,
  });

  const FOLLOWTABNAV = [
    { id: "follower", name: "팔로워", count: followerList?.length },
    { id: "following", name: "팔로잉", count: followingList?.length },
  ];

  return (
    <S.ShowFollowContainer>
      <S.FollowNavWrap>
        {FOLLOWTABNAV.map((tab: TabType) => {
          return (
            <S.Content key={tab.id}>
              <S.TabButton
                onClick={() => router.push(`/?follow=${tab.id}`)}
                $isActive={follow === tab.id}
              >
                <h1>
                  <span>{formatFollowCount(tab.count)}</span>
                  {tab.name}
                </h1>
              </S.TabButton>
            </S.Content>
          );
        })}
      </S.FollowNavWrap>
      <ul>
        {follow === "follower" ? (
          followerList && followerList.length > 0 ? (
            followerList?.map((user: any) => {
              return (
                <li key={user.id}>
                  <UserContainer user={user} type={"follow"} />
                </li>
              );
            })
          ) : (
            <S.EmptyMessage>
              <People fill={`${styleColor.WHITE}`} />
              아직 팔로워가 없습니다.
            </S.EmptyMessage>
          )
        ) : followingList && followingList.length > 0 ? (
          followingList.map((user: any) => {
            return (
              <li key={user.id}>
                <UserContainer user={user} type={"follow"} />
              </li>
            );
          })
        ) : (
          <S.EmptyMessage>
            <People fill={`${styleColor.WHITE}`} />
            아직 팔로잉이 없습니다.
          </S.EmptyMessage>
        )}
      </ul>
    </S.ShowFollowContainer>
  );
};

export default ShowFollowContainer;

const S = {
  ShowFollowContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
    height: calc(100vh - 272.5px);
    background-color: ${styleColor.BLACK[300]};
  `,
  FollowNavWrap: styled.ul`
    padding: 0px 12px;
    margin-bottom: 14px;
    display: flex;
    justify-content: start;
    border-bottom: solid 1px ${styleColor.WHITE};
  `,
  Content: styled.li``,
  TabButton: styled.button<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 14px;
    border-bottom: ${(props) => (props.$isActive ? "2px solid #fff" : "none")};
    h1 {
      ${styleFont.title.tit_xs}
      font-weight: ${(props) => (props.$isActive ? "600" : "400")};
      color: #fff;
      span {
        margin-right: 4px;
      }
    }
  `,
  EmptyMessage: styled.h1`
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    ${styleFont.title.tit_md};
    color: ${styleColor.WHITE};
  `,
};

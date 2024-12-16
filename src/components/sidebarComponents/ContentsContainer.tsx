import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useRouter } from "next/router";
import styled from "styled-components";
import ProfileContainer from "../profileComponents/ProfileContainer";
import MyAddressContainer from "./MyAddressContainer";
import { useRecoilValue } from "recoil";
import { myLocationState, showFollowState } from "@/globalState/recoilState";
import useLoginUserId from "@/hook/useLoginUserId";
import useInitializeMapState from "@/hook/useInitializeMapState";

const CONTENTSTABNAV = [
  { id: "nearbySelectshop", name: "편집샵 보기" },
  { id: "visitedSelectshop", name: "방문한 편집샵 보기" },
  { id: "notVisiteSelectshop", name: "방문하지 못한 편집샵 보기" },
  { id: "bestReviewer", name: "베스트 리뷰어" },
];

const ContentsContainer = () => {
  const myLocation = useRecoilValue(myLocationState);
  const showFollow = useRecoilValue(showFollowState);
  const loginUser = useLoginUserId();
  const router = useRouter();

  useInitializeMapState(myLocation.center.lat, myLocation.center.lng);

  const viewSelectShopHandle = (id: string) => {
    if (id !== "nearbySelectshop" && id !== "bestReviewer" && !loginUser) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("?modal=login");
      return;
    }
    router.push(`/?tab=${id}`);
  };

  return (
    <S.ContentsContainer>
      <ProfileContainer />
      {showFollow ? (
        <div>aaa</div>
      ) : (
        <>
          <MyAddressContainer />
          <S.ContentsInner>
            {CONTENTSTABNAV.map((content) => {
              return (
                <S.Content key={content.id}>
                  <S.ContentButton
                    onClick={() => viewSelectShopHandle(content.id)}
                  >
                    {content.name}
                  </S.ContentButton>
                </S.Content>
              );
            })}
          </S.ContentsInner>
        </>
      )}
    </S.ContentsContainer>
  );
};

export default ContentsContainer;

const S = {
  ContentsContainer: styled.div`
    width: 100%;
  `,

  ContentsInner: styled.ul`
    padding: 20px 12px;
  `,
  Content: styled.li`
    margin-bottom: 8px;
  `,
  ContentButton: styled.button`
    cursor: pointer;
    width: 100%;
    border: solid 1px ${styleColor.RED[0]};
    border-radius: 4px;
    padding: 12px 0px;
    ${styleFont.title.tit_xs}
    text-align: left;
    text-indent: 10px;
  `,
};

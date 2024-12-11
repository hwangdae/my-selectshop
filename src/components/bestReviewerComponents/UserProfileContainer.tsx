import { getAllFollowList } from "@/api/follow";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { UserType } from "@/types/authType";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import FollowContainer from "./FollowContainer";
import { FollowType } from "@/types/followType";

interface PropsType {
  user: UserType & {filteredReviewCount? : number};
  index:number;
}

const UserProfileContainer = ({ user,index }: PropsType) => {
  const { id, profileImage, nickName, filteredReviewCount } = user;

  const { data: followList } = useQuery({
    queryKey: ["followee"],
    queryFn: () => getAllFollowList(),
  });

  const followerCount = followList?.filter((v:FollowType) => {
    return v.followee_id === id;
  }).length;

  return (
    <S.ProfileInfoContainer>
      <S.ProfileInfoInner>
        <S.Rank>{index+1}</S.Rank>
        <S.ProfileImageWrap>
          <S.ProfileImage src={profileImage} />
        </S.ProfileImageWrap>
        <S.UserInfoWrap>
          <S.UserEmail>{nickName}</S.UserEmail>
          <S.UserActivity>
            <S.Activity>
              <h3>
                리뷰수<span>{filteredReviewCount}</span>
              </h3>
            </S.Activity>
            <S.Activity>
              <h3>
                팔로워<span>{followerCount}</span>
              </h3>
            </S.Activity>
          </S.UserActivity>
        </S.UserInfoWrap>
        <FollowContainer id={id} />
      </S.ProfileInfoInner>
    </S.ProfileInfoContainer>
  );
};

export default UserProfileContainer;

const S = {
  ProfileInfoContainer: styled.div`
    cursor: pointer;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px 1px rgba(124, 124, 124, 0.1);
    border-radius: 4px;
  `,
  ProfileInfoInner: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 18px;
  `,
  Rank: styled.span`
    ${styleFont.title.tit_sm}
    background: linear-gradient(to right, #fbff0c 0%, #efff08 100%);
    color: ${styleColor.WHITE};
    padding: 5px;
    border-radius: 4px;
  `,
  ProfileImageWrap: styled.div`
    width: 20%;
  `,
  ProfileImage: styled.img`
    width: 55px;
    height: 55px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserInfoWrap: styled.div`
    width: 45%;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
    margin-bottom: 6px;
  `,
  UserActivity: styled.ul`
    display: flex;
  `,
  Activity: styled.li`
    display: flex;
    border-right: solid 1px #eee;
    margin-right: 5px;
    padding-right: 5px;
    letter-spacing: -1px;
    h3 {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    span {
      margin-left: 4px;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    &:last-child {
      border-right: none;
      padding-right: 0px;
    }
  `,
};

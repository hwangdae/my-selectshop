import { styleColor } from '@/styles/styleColor'
import { styleFont } from '@/styles/styleFont'
import { UserType } from '@/types/authType'
import { ReviewType } from '@/types/reviewType'
import React from 'react'
import styled from 'styled-components'

interface PropsType {
    review : ReviewType;
    users : any
}

const AllReview = ({review,users}:PropsType) => {

    const {userId,description,tags} = review
    console.log(review)
    // const {id,nickName,profileImage} = user
    const user = users?.find((user:UserType)=>{
      return user.id === userId
    })
    console.log(user)
  return (
    <S.ReviewWrap>
    <S.UserContainer>
      <S.ProfileImage src={user?.profileImage} />
      <S.writtenUser>
        {user?.nickName}님의 후기
      </S.writtenUser>
    </S.UserContainer>
    <S.ReviewDescription>
      {description}
    </S.ReviewDescription>
    <S.TagList>
      {tags === null
        ? "추천할 브랜드가 없어요"
        : review?.tags?.split(",").map((tag: string) => {
            return <li key={tag}>{tag}</li>;
          })}
    </S.TagList>
  </S.ReviewWrap>
  )
}

export default AllReview

const S = {
    ReviewWrap: styled.li`
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  `,
  UserContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  `,
  ProfileImage: styled.img`
    width: 32px;
    height: 32px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  writtenUser: styled.p`
    ${styleFont.textsmall}
    font-weight: 400;
  `,
  ReviewDescription: styled.h1`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    margin-bottom: 10px;
    ${styleFont.textsmall}
    font-weight: 400;
  `,
  TagList: styled.ul`
    list-style: none !important ;
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    ${styleFont.textsmall}
    font-weight: 400;
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
}

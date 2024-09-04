import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export interface ReviewType {
  file : File | null;
  review : string;
  advantage : string;
  disAdvantage : string;
  brand : string;
}

const WriteReview = () => {
    
  const router = useRouter()
  const {id} = router.query
  const loginUser = useLoginUserId();

  const {register,handleSubmit} = useForm({defaultValues:{
    file: null,
    review : "",
    advantage : "",
    disAdvantage : "",
    brand : "",
  }})

  const addReviewSubmit = async({file,review,advantage,disAdvantage,brand}:ReviewType) => {
    const newReview = {
      selectshopId : id,
      reviewImages : file,
      description : review,
      visited : true,
      good : advantage,
      notGood : disAdvantage,
      tags:brand,
      userId : loginUser
    }
    await supabase.from('review').insert(newReview)
    alert('작성이 완료 되었습니다.')

  };

  return (
    <div>
      <form onSubmit={handleSubmit(addReviewSubmit)}>
        <div>
          <h1>후기 등록하기</h1>
          <button type="submit">저장</button>
        </div>
        <ul>
          <li>
            <label htmlFor="file-upload"></label>
            <S.Input id="file-upload" type="file" {...register("file")}></S.Input>
          </li>
          <li>
            <label htmlFor="review">후기</label>
            <S.Input id="review"  {...register("review")}></S.Input>
          </li>
          <li>
            <label htmlFor="advantage">장점</label>
            <S.Input id="advantage"  {...register("advantage")}></S.Input>
          </li>
          <li>
            <label htmlFor="disAdvantage">단점</label>
            <S.Input id="disAdvantage" {...register("disAdvantage")}></S.Input>
          </li>
          <li>
            <label htmlFor="brand">추천 브랜드</label>
            <S.Input id="brand" placeholder="쉼표(,)로 구분하면 멋진 태그가 될거에요!" {...register("brand")}></S.Input>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default WriteReview;

const S = {
  Input : styled.input`
    width: 100%;
    padding: 18px 0px;
    margin-bottom: 7px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 4px;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `
}

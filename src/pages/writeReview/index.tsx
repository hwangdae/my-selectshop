import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";

export interface ReviewType {
  file: File | null;
  review: string;
  advantage: { value: string }[]; // advantage를 배열로 관리
  disAdvantage: string;
  brand: string;
}

const WriteReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const loginUser = useLoginUserId();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      file: null,
      review: "",
      advantage: [{ value: "" }], // 장점 필드의 기본값
      disAdvantage: "",
      brand: "",
    },
  });

  // useFieldArray를 사용하여 동적으로 필드를 관리
  const { fields, append } = useFieldArray({
    control,
    name: "advantage",
  });

  console.log(fields,"필드스")

  // 리뷰 등록 함수
  const addReviewSubmit = async (data: ReviewType) => {
    const newReview = {
      selectshopId: id,
      reviewImages: data.file,
      description: data.review,
      visited: true,
      good: data.advantage.map((item) => item.value).join(", "), // 배열을 쉼표로 구분하여 저장
      notGood: data.disAdvantage,
      tags: data.brand,
      userId: loginUser,
    };
    await supabase.from("review").insert(newReview);
    alert("작성이 완료 되었습니다.");
  };

  // 장점 필드 추가
  const plusGoodReviewHandler = () => {
    append({ value: "" }); // 새로운 빈 장점 필드 추가
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
            <S.Label htmlFor="file-upload"></S.Label>
            <S.Input
              id="file-upload"
              type="file"
              {...register("file")}
            ></S.Input>
          </li>
          <li>
            <S.Label htmlFor="review">후기</S.Label>
            <S.Input id="review" {...register("review")}></S.Input>
          </li>
          <li>
            <S.Label htmlFor="advantage">장점            <button type="button" onClick={plusGoodReviewHandler}>
              + 장점 추가
            </button></S.Label>
            {fields.map((field, index) => (
              <div key={field.id}>
                <S.Input
                  id={`advantage-${index}`}
                  {...register(`advantage.${index}.value`)} // 인덱스를 사용하여 고유한 이름으로 등록
                />
              </div>
            ))}

          </li>
          <li>
            <S.Label htmlFor="disAdvantage">단점</S.Label>
            <S.Input id="disAdvantage" {...register("disAdvantage")}></S.Input>
          </li>
          <li>
            <S.Label htmlFor="brand">추천 브랜드</S.Label>
            <S.Input
              id="brand"
              placeholder="쉼표(,)로 구분하면 멋진 태그가 될거에요!"
              {...register("brand")}
            ></S.Input>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default WriteReview;

const S = {
  Label : styled.label`
  display: block;
  margin-bottom: 15px;
  `,
  Input: styled.input`
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
  `,
};
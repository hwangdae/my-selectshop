import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";
import { RegisterReviewInput } from "@/types/reviewType";
import { registerReviewSchema } from "@/validators/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

export interface ReviewType {
  file: File | null | undefined;
  review: string;
  advantage: { value: string }[]; // advantage를 배열로 관리
  disAdvantage: {value :string}[];
  brand: string;
}

const WriteReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const loginUser = useLoginUserId();

  const { register, handleSubmit, control } = useForm<ReviewType>({
    resolver:zodResolver(registerReviewSchema),
    defaultValues: {
      file: null,
      review: "",
      advantage: [{ value: "" }],
      disAdvantage: [{ value: "" }],
      brand: "",
    },
  });

  const {
    fields: advantageFields,
    append: advantageAppend,
    remove: advantageRemove,
  } = useFieldArray({
    control,
    name: "advantage",
  });

  const {
    fields: disAdvantageFields,
    append: disAdvantageAppend,
    remove: disAdvantageRemove,
  } = useFieldArray({
    control,
    name: "disAdvantage",
  });

  const addReviewSubmit: SubmitHandler<ReviewType> = async ({file,review,advantage,disAdvantage,brand}: ReviewType) => {
    const newReview = {
      selectshopId: id,
      reviewImages:file,
      description: review,
      visited: true,
      good: advantage?.map((item) => item.value).join(","),
      notGood: disAdvantage?.map((item)=>item.value).join(","),
      tags: brand,
      userId: loginUser,
    };
    await supabase.from("review").insert(newReview);
    alert("작성이 완료 되었습니다.");
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
            <S.Label htmlFor="advantage">
              장점
              <button
                type="button"
                onClick={() => advantageAppend({ value: "" })}
              >
                +
              </button>
            </S.Label>
            {advantageFields.map((field, index) => (
              <div key={field.id}>
                <S.Input
                  id={`advantage-${index}`}
                  {...register(`advantage.${index}.value`)} // 인덱스를 사용하여 고유한 이름으로 등록
                />
                {index > 0 && (
                  <button onClick={() => advantageRemove(index)}>삭제</button>
                )}
              </div>
            ))}
          </li>
          <li>
            <S.Label htmlFor="disAdvantage">
              단점
              <button
                type="button"
                onClick={() => disAdvantageAppend({ value: "" })}
              >
                +
              </button>
            </S.Label>
            {disAdvantageFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <S.Input
                    id={`disAdvantage-${index}`}
                    {...register(`disAdvantage.${index}.value`)}
                  ></S.Input>
                  {index > 0 && (
                    <button onClick={() => disAdvantageRemove(index)}>
                      삭제
                    </button>
                  )}
                </div>
              );
            })}
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
  Label: styled.label`
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

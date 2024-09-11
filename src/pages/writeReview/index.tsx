import useLoginUserId from "@/hook/useLoginUserId";
import supabase from "@/lib/supabaseClient";
import { styleColor } from "@/styles/styleColor";
import { RegisterReviewInput } from "@/types/reviewType";
import { registerReviewSchema } from "@/validators/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { Blob } from "buffer";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

export interface ReviewType {
  file: FileList | null | undefined;
  review: string;
  advantage: { value: string }[];
  disAdvantage: { value: string }[];
  tags: string;
}

const WriteReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const loginUser = useLoginUserId();
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >("");

  const { register, handleSubmit, control, watch } = useForm<ReviewType>({
    resolver: zodResolver(registerReviewSchema),
    defaultValues: {
      file: null,
      review: "",
      advantage: [{ value: "" }],
      disAdvantage: [{ value: "" }],
      tags: "",
    },
  });
  const onchangeImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const uploadImageFile = e.target.files![0]
    if (uploadImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadImageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      };
    }
  }
  console.log(watch("file"));
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

  const addReviewSubmit: SubmitHandler<ReviewType> = async ({
    file,
    review,
    advantage,
    disAdvantage,
    tags,
  }: ReviewType) => {
    if (!file || file.length === 0) {
      alert("파일을 업로드해 주세요.");
      return;
    }

    const newReview = {
      selectshopId: id,
      reviewImages: file === null ? null : file[0].name,
      description: review,
      visited: true,
      good: advantage?.map((item) => item.value).join(","),
      notGood: disAdvantage?.map((item) => item.value).join(","),
      tags: tags,
      userId: loginUser,
    };
    console.log(file, "새로운 리뷰");
    try {
      await supabase.from("review").insert(newReview);
      alert("작성이 완료 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(previewImage)
  return (
    <div>
      <form onSubmit={handleSubmit(addReviewSubmit)}>
        <div>
          <h1>후기 등록하기</h1>
        </div>
        <ul>
          <li>
            <img src={`${previewImage}`} style={{width:'200px', height:'200px'}}></img>
            <S.Label htmlFor="file-upload">이미지 찾기</S.Label>
            <S.ImageInput
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onchangeImageUpload}
            ></S.ImageInput>
          </li>
          <li>
            <S.Label htmlFor="review">후기</S.Label>
            <S.Input id="review" {...register("review")}></S.Input>
          </li>
          <li>
            <S.Label htmlFor="advantage">
              장점
              <S.AddButton
                type="button"
                onClick={() => advantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
            </S.Label>
            {advantageFields.map((field, index) => (
              <div key={field.id}>
                <S.Input
                  id={`advantage-${index}`}
                  {...register(`advantage.${index}.value`)}
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
              <S.AddButton
                type="button"
                onClick={() => disAdvantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
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
              {...register("tags")}
            ></S.Input>
          </li>
        </ul>
        <Button type="submit">저장</Button>
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
  ImageInput: styled.input`
    display: none;
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
  AddButton: styled.button`
    width: 20px;
    height: 20px;
    background-color: ${styleColor.INDIGO[0]};
    color: #fff;
    border-radius: 4px;
    margin-left: 7px;
  `,
};

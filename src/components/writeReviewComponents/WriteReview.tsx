import WriteReviewInputImage from "@/components/writeReviewComponents/WriteReviewInputImage";
import useLoginUserId from "@/hook/useLoginUserId";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { registerReviewSchema } from "@/validators/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldArrayWithId,
} from "react-hook-form";
import shortid from "shortid";
import styled from "styled-components";
import Trash from "@/assets/Trash.svg";
import { ErrorMessage } from "@hookform/error-message";
import { NewReviewType, UploadReviewType } from "@/types/reviewType";
import useReviewMutate from "@/hook/useReviewMutate";
import { uploadReviewImages } from "@/api/storage";

interface PropsType {
  selectshopId: string;
}

const WriteReview = ({ selectshopId }: PropsType) => {
  const loginUser = useLoginUserId();
  const [files, setFiles] = useState<File[]>([]);
  const { reviewMutate } = useReviewMutate(selectshopId);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UploadReviewType>({
    resolver: zodResolver(registerReviewSchema),
    defaultValues: {
      reviewImages: null,
      description: "",
      advantages: [{ value: "" }],
      disAdvantages: [{ value: "" }],
      tags: "",
    },
  });

  const {
    fields: advantageFields,
    append: advantageAppend,
    remove: advantageRemove,
  } = useFieldArray({
    control,
    name: "advantages",
  });

  const {
    fields: disAdvantageFields,
    append: disAdvantageAppend,
    remove: disAdvantageRemove,
  } = useFieldArray({
    control,
    name: "disAdvantages",
  });

  const addReviewSubmit: SubmitHandler<UploadReviewType> = async ({
    description,
    advantages,
    disAdvantages,
    tags,
  }) => {
    let imagesString: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const fileExtension = file.name.split(".").pop();
        const randomFileName = `${shortid.generate()}.${fileExtension}`;
        try {
          await uploadReviewImages(randomFileName, file);
          imagesString.push(
            `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/reviewImages/${randomFileName}`
          );
        } catch (error) {
          alert("이미지 업로드 중 오류가 발생했습니다.");
          console.error(error);
          return;
        }
      }
    }

    const newReview: NewReviewType = {
      selectshopId,
      reviewImages: imagesString.length > 0 ? imagesString.join(",") : null,
      description,
      advantages: advantages?.map((item) => item.value) || null,
      disAdvantages: disAdvantages?.map((item) => item.value) || null,
      tags: tags,
      userId: loginUser,
    };

    try {
      reviewMutate.mutate(newReview);
      alert("작성이 완료 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.WriteReviewContainer>
      <S.WriteReviewInner onSubmit={handleSubmit(addReviewSubmit)}>
        <S.WriteReviewTitle>✍ 후기 등록하기</S.WriteReviewTitle>
        <S.WriteReviewUl>
          <S.InputLiRow>
            <WriteReviewInputImage files={files} setFiles={setFiles} />
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="description">후기</S.Label>
            <S.TextAreaWrap>
              <S.TextArea
                id="description"
                {...register("description")}
                maxLength={50}
              />
              <S.StringLength>
                {watch("description").length}
                /50
              </S.StringLength>
            </S.TextAreaWrap>
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <S.ReviewErrorMessage>{message}</S.ReviewErrorMessage>
              )}
            />
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="advantage">
              장점
              <S.AddButton
                type="button"
                onClick={() => advantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
            </S.Label>
            {advantageFields.map(
              (
                field: FieldArrayWithId<UploadReviewType, "advantages", "id">,
                index
              ) => (
                <S.InputWrap key={field.id}>
                  <S.Input
                    id={`advantage-${index}`}
                    {...register(`advantages.${index}.value` as const)}
                  />
                  {index > 0 && (
                    <button onClick={() => advantageRemove(index)}>
                      <Trash fill={`${styleColor.GRAY[200]}`} />
                    </button>
                  )}
                </S.InputWrap>
              )
            )}
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="disAdvantage">
              단점
              <S.AddButton
                type="button"
                onClick={() => disAdvantageAppend({ value: "" })}
              >
                +
              </S.AddButton>
            </S.Label>
            {disAdvantageFields.map(
              (
                field: FieldArrayWithId<
                  UploadReviewType,
                  "disAdvantages",
                  "id"
                >,
                index
              ) => {
                return (
                  <S.InputWrap key={field.id}>
                    <S.Input
                      id={`disAdvantage-${index}`}
                      {...register(`disAdvantages.${index}.value` as const)}
                    />
                    {index > 0 && (
                      <button onClick={() => disAdvantageRemove(index)}>
                        <Trash fill={`${styleColor.GRAY[200]}`} />
                      </button>
                    )}
                  </S.InputWrap>
                );
              }
            )}
          </S.InputLiRow>
          <S.InputLiRow>
            <S.Label htmlFor="tags">추천 브랜드</S.Label>
            <S.InputWrap>
              <S.Input
                id="tags"
                placeholder="쉼표(,)로 구분하면 멋진 태그가 될거에요!"
                {...register("tags")}
              />
            </S.InputWrap>
          </S.InputLiRow>
        </S.WriteReviewUl>
        <Button type="submit">저장</Button>
      </S.WriteReviewInner>
    </S.WriteReviewContainer>
  );
};

export default WriteReview;

const S = {
  WriteReviewContainer: styled.div``,
  WriteReviewInner: styled.form`
    padding: 20px 0px;
  `,
  WriteReviewTitle: styled.h1`
    ${styleFont.title.tit_md}
    margin-bottom: 15px;
  `,
  WriteReviewUl: styled.ul`
    li:first-child {
      padding: 0px;
    }
  `,
  InputLiRow: styled.li`
    padding: 0px 12px;
    margin-bottom: 15px;
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
    ${styleFont.text.txt_md}
  `,
  ImageInput: styled.input`
    display: none;
  `,
  TextAreaWrap: styled.div`
    position: relative;
    right: 0;
    bottom: 0;
  `,
  TextArea: styled.textarea`
    max-width: 94%;
    width: 94%;
    height: 90px;
    padding: 12px 7px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 4px;
    outline: none;
    resize: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  StringLength: styled.p`
    position: absolute;
    right: 10px;
    bottom: 10px;
    ${styleFont.text.txt_md}
    color: ${styleColor.GRAY[400]};
  `,
  InputWrap: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 7px;
    width: 97%;
    padding: 12px 0px;
    padding-right: 7px;
    margin-bottom: 7px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 4px;
    outline: none;
    button {
      cursor: pointer;
    }
  `,
  Input: styled.input`
    width: 100%;
    border: none;
    outline: none;
    text-indent: 7px;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  AddButton: styled.button`
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: ${styleColor.INDIGO[0]};
    ${styleFont.text.txt_sm}
    color: #fff;
    border-radius: 4px;
  `,
  ReviewErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
};

import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import React from "react";
import styled from "styled-components";

interface PropsType {
  tags: string | null;
  type: string;
}

const Tags = ({ tags, type }: PropsType) => {
  return (
    <S.TagList $type={type}>
      {tags !== ""
        ? tags?.split(",").map((tag,index) => {
            return <li key={`${tag}-${index}`}>{tag}</li>;
          })
        : "추천할 브랜드가 없어요"}
    </S.TagList>
  );
};

export default Tags;

const S = {
  TagList: styled.ul<{ $type: string }>`
    list-style: none !important ;
    background-color: ${(props) =>
      props.$type === "allReview" ? `${styleColor.GRAY[0]}` : ""};
    padding: ${(props) => (props.$type === "allReview" ? `10px` : "")};
    ${styleFont.text.txt_sm}
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
};

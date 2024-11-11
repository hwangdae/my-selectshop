import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import React from "react";
import styled from "styled-components";

interface PropsType {
  tags : string | null;
}

const Tags = ({tags}:PropsType) => {
  return (
    <S.TagList>
      {tags !== null ? tags?.split(",").map((tag) => {
        return <li>{tag}</li>;
      }) : "추천할 브랜드가 없어요"}
    </S.TagList>
  );
};

export default Tags;

const S = {
  TagList: styled.ul`
    list-style: none !important ;
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
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

import React, { RefObject, useEffect } from "react";
import styled from "styled-components";
import Chevron from "@/assets/Chevron.svg";
import Chevrons from "@/assets/Chevrons.svg";
import { styleColor } from "@/styles/styleColor";
import { PaginationType } from "@/types/placeType";

interface PropsType {
  pagination: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  scrollRef: RefObject<HTMLDivElement>;
}

const PaginationContainer = ({
  pagination,
  currentPage,
  setCurrentPage,
  scrollRef,
}: PropsType) => {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [pagination, scrollRef]);

  const nextPageButtonHandler = () => {
    if (pagination && pagination.hasNextPage) {
      setCurrentPage(currentPage + 1);
      pagination.nextPage;
    }
  };

  const prevPageButtonHandler = () => {
    if (pagination && pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1);
      pagination.prevPage;
    }
  };

  return (
    <S.PaginationContainer>
      <S.PageButtonWrap>
        <button onClick={() => setCurrentPage(pagination.first)}>
          <Chevrons
            transform={"rotate(180)"}
            fill={`${styleColor.GRAY[400]}`}
          />
        </button>
        <button onClick={prevPageButtonHandler}>
          <Chevron transform={"rotate(180)"} fill={`${styleColor.GRAY[400]}`} />
        </button>
      </S.PageButtonWrap>
      <S.PageNumberButtons>
        {Array.from({ length: pagination?.last }).map((_, index) => {
          return (
            <S.PageNumberButton
              key={index}
              $index={index + 1}
              $currentPage={currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </S.PageNumberButton>
          );
        })}
      </S.PageNumberButtons>
      <S.PageButtonWrap>
        <button onClick={nextPageButtonHandler}>
          <Chevron fill={`${styleColor.GRAY[400]}`} />
        </button>
        <button onClick={() => setCurrentPage(pagination.last)}>
          <Chevrons fill={`${styleColor.GRAY[400]}`} />
        </button>
      </S.PageButtonWrap>
    </S.PaginationContainer>
  );
};

export default PaginationContainer;

const S = {
  PaginationContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin-bottom: 20px;
  `,
  PageButtonWrap: styled.div`
    display: flex;
    gap: 10px;
    button {
      cursor: pointer;
      font-size: 16px;
      letter-spacing: -2px;
      svg {
        display: block;
      }
    }
  `,
  PageNumberButtons: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `,
  PageNumberButton: styled.button<{ $index: Number; $currentPage: Number }>`
    cursor: pointer;
    font-size: 14px;
    color: ${(props) =>
      props.$index === props.$currentPage ? `#000` : `${styleColor.GRAY[400]}`};
    font-weight: bold;
  `,
};

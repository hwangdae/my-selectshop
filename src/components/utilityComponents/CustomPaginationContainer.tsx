import React, { RefObject, useEffect } from "react";
import Chevron from "@/assets/Chevron.svg";
import Chevrons from "@/assets/Chevrons.svg";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { PlaceType } from "@/types/placeType";

interface PropsType {
  selectshops: PlaceType[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  scrollRef: RefObject<HTMLDivElement>;
}

const CustomPaginationContainer = ({
  selectshops,
  currentPage,
  setCurrentPage,
  scrollRef,
}: PropsType) => {

  const totalPages = Math.ceil(selectshops.length / 15);

  console.log(Array.from({length : totalPages}))

  console.log(selectshops.length)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [currentPage]);

  return (
    <S.PaginationContainer>
      <S.PageButtonWrap>
       <button onClick={()=>setCurrentPage(1)}>
          <Chevrons
            transform={"rotate(180)"}
            fill={`${styleColor.GRAY[400]}`}
          />
        </button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <Chevron transform={"rotate(180)"} fill={`${styleColor.GRAY[400]}`} />
        </button>
      </S.PageButtonWrap>
      <S.PageNumberButtons>
        {Array.from({ length: totalPages }).map((_, index) => {
          return (
            <S.PageNumberButton
              key={index+1}
              $index={index+1}
              $currentPage={currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </S.PageNumberButton>
          );
        })}
      </S.PageNumberButtons>
      <S.PageButtonWrap>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <Chevron fill={`${styleColor.GRAY[400]}`} />
        </button>
        <button onClick={()=>setCurrentPage(totalPages)}>
          <Chevrons fill={`${styleColor.GRAY[400]}`} />
        </button>
      </S.PageButtonWrap>
    </S.PaginationContainer>
  );
};

export default CustomPaginationContainer;

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

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface PropsType {
  slideImages: string | null;
}

const CommonSwiper = ({ slideImages }: PropsType) => {

  return (
    <S.SwiperWrap>
      <S.CustomSwiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
      >
        {slideImages?.split(",").map((img: string, index: number) => {
          return (
            <S.SwiperSlide key={index}>
              <img src={img} alt={`${index+1}번째 업로드 이미지 `} width={300} height={90}/>
            </S.SwiperSlide>
          );
        })}
      </S.CustomSwiper>
    </S.SwiperWrap>
  );
};

export default CommonSwiper;

const S = {
  SwiperWrap: styled.div`
    width: 100%;
    height: 180px;
  `,
  CustomSwiper: styled(Swiper)`
    width: 100%;
    height: 100%;
  `,

  SwiperSlide: styled(SwiperSlide)`
    width: 100%;
    height: 100%;
    background-image: cover;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};

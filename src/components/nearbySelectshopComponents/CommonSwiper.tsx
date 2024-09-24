import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideImgProps {
  slideImages: string;
}

const CommonSwiper = ({slideImages}: SlideImgProps) => {

  return (
    <S.SwiperWrap>
      <S.CustomSwiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{clickable: true,}}
        modules={[Pagination, Navigation]}
      >
        {slideImages?.split(',').map((img,index) => {
          return (
              <S.SwiperSlide key={index}>
                <img src={img} alt="Image" />
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
  `
};
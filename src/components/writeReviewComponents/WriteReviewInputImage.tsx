import React, { useState } from "react";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const WriteReviewInputImage = ({
  type = "file",
  accept = 'accept="image/*"',
  id = "file-upload",
  ...props
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFile) => [...prevFile, e.target.files![0]]);
    }
  };

  return (
    <>
      <S.Label htmlFor="file-upload">
        {files.length === 0 ? (
          <S.NoImageWrapper>
            <NoImage />
          </S.NoImageWrapper>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {files.map((file, index) => (
              <SwiperSlide key={index}>
                <S.UploadImage src={URL.createObjectURL(file)} alt={`uploaded-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </S.Label>
      <S.ImageInput type={type} id={id} accept={accept} onChange={onChange} />
    </>
  );
};

export default WriteReviewInputImage;

const S = {
  Label: styled.label`
    display: block;
    margin-bottom: 15px;
    cursor: pointer;
  `,
  ImageInput: styled.input`
    display: none;
  `,
  UploadImage: styled.img`
    width: 100%;
    height: auto;
  `,
  NoImageWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
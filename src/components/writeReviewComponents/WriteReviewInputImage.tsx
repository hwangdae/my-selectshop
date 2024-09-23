import React, { forwardRef, useState } from "react";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const WriteReviewInputImage = forwardRef<HTMLInputElement, PropsType>(
  ({
    files,
    setFiles,
    type = "file",
    accept = 'accept="image/*"',
    id = "file-upload",
    ...props
  }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setFiles(files);
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
            <Swiper spaceBetween={50} slidesPerView={1}>
              {files.map((file, index) => (
                <SwiperSlide key={index}>
                  <S.UploadImage
                    src={URL.createObjectURL(file)}
                    alt={`uploaded-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </S.Label>
        <S.ImageInput
          multiple
          type={type}
          id={id}
          accept={accept}
          {...props}
          onChange={onChange}
        />
      </>
    );
  }
);

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

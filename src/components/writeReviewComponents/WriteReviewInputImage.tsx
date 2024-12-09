import React, { forwardRef } from "react";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageCompressionFn } from "@/utilityFunction/imageCompression";

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
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        const compressionFiles = await Promise.all(
          files.map((file) => imageCompressionFn(file, "medium"))
        );
        setFiles(compressionFiles);
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
            <S.ImageSwiper spaceBetween={50} slidesPerView={1}>
              {files.map((file, index) => (
                <S.SwiperSlide key={index}>
                  <S.UploadImage
                    src={URL.createObjectURL(file)}
                    alt={`uploaded-${index}`}
                  />
                </S.SwiperSlide>
              ))}
            </S.ImageSwiper>
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
    height: 100%;
    object-fit: cover;
  `,
  NoImageWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ImageSwiper: styled(Swiper)`
    width: 100%;
    height: 180px;
  `,
  SwiperSlide: styled(SwiperSlide)`
    width: 100%;
    height: 100%;
    background-image: cover;
  `,
};

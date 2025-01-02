import React, { forwardRef, useState } from "react";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageCompressionFn } from "@/utilityFunction/imageCompression";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  prevReview: string | null | undefined;
}

const WriteReviewInputImage = ({
  files,
  setFiles,
  prevReview,
  type = "file",
  accept = "image/*",
  id = "file-upload",
  ...props
}: PropsType) => {
  const [previewImages, setPreviewImages] = useState<string[]>(
    prevReview ? prevReview.split(",") : []
  );

  const onChangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const compressedFiles = await Promise.all(
        newFiles.map((file) => imageCompressionFn(file, "small"))
      );
      setFiles(compressedFiles);
    }
  };

  return (
    <>
      <S.Label htmlFor={id}>
        {files.length === 0 && previewImages.length > 0 ? (
          <S.ImageSwiper slidesPerView={1}>
            {previewImages.map((file: string, index: number) => (
              <S.SwiperSlide key={index}>
                <S.UploadImage src={file} alt={`preview-${index}`} />
              </S.SwiperSlide>
            ))}
          </S.ImageSwiper>
        ) : files.length > 0 ? (
          <S.ImageSwiper slidesPerView={1}>
            {files.map((file, index) => (
              <S.SwiperSlide key={index}>
                <S.UploadImage
                  src={URL.createObjectURL(file)}
                  alt={`uploaded-${index}`}
                />
              </S.SwiperSlide>
            ))}
          </S.ImageSwiper>
        ) : (
          <S.NoImageWrapper>
            <NoImage />
          </S.NoImageWrapper>
        )}
      </S.Label>
      <S.ImageInput
        multiple
        type={type}
        id={id}
        accept={accept}
        {...props}
        onChange={onChangeImageUpload}
      />
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

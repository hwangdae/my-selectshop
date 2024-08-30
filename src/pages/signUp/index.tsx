import { registerSignUpSchema } from "@/validators/auth";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { ErrorMessage } from "@hookform/error-message";
import Eye from "@/assets/Eye.svg";
import EyeInvisible from "@/assets/EyeInvisible.svg";
import { AuthType, RegisterSignUpInput } from "@/types/authType";
import useToggle from "@/hook/useToggle";
import { CommonButton } from "@/styles/commonButton";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";
import { signUp } from "@/api/user";
import { modal, modalContent } from "@/styles/modal";
import { ModalProps } from "@/components/ModalMap";

const SignUp = ({ onClose }:ModalProps) => {
  const [showPassword, handlePasswordToggle] = useToggle(false);
  const [showCheckPassword, handleCheckPasswordToggle] = useToggle(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSignUpInput>({
    resolver: zodResolver(registerSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      nickName: "",
    },
  });

  const signupHandleSubmit: SubmitHandler<RegisterSignUpInput> = async ({
    email,
    password,
    nickName,
  }: AuthType) => {
    await signUp(email, password, nickName);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user,"회원가입 유저")
    const newUser = {
      id: user?.id,
      email: user?.email,
      nickName: user?.user_metadata?.nickName,
    };
    await supabase.from("users").insert(newUser);
    alert("회원가입이 완료되었습니다.");
    router.push("/");
  };

  const modalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <S.SignUpContainer onClick={modalClose}>
        <S.SignUpInner>
          <S.SignUpTitle>회원가입</S.SignUpTitle>
          <S.SignUpForm onSubmit={handleSubmit(signupHandleSubmit)}>
            <S.SignUpFormInner>
              <S.SignUpListItem>
                <S.SignUpInput
                  placeholder="이메일 주소"
                  {...register("email")}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
                <S.InputContainer>
                  <S.SignUpInput
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    {...register("password")}
                  />
                  <S.ShowPasswordToggle
                    type="button"
                    tabIndex={-1}
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? (
                      <Eye width="20px" height="20px" fill="#a0a0a0" />
                    ) : (
                      <EyeInvisible width="20px" height="20px" fill="#a0a0a0" />
                    )}
                  </S.ShowPasswordToggle>
                </S.InputContainer>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
                <S.InputContainer>
                  <S.SignUpInput
                    type={showCheckPassword ? "text" : "password"}
                    placeholder="비밀번호 재입력"
                    {...register("checkPassword")}
                  />
                  <S.ShowPasswordToggle
                    type="button"
                    tabIndex={-1}
                    onClick={handleCheckPasswordToggle}
                  >
                    {showCheckPassword ? (
                      <Eye width="20px" height="auto" fill="#a0a0a0" />
                    ) : (
                      <EyeInvisible width="20px" height="auto" fill="#a0a0a0" />
                    )}
                  </S.ShowPasswordToggle>
                </S.InputContainer>
                <ErrorMessage
                  errors={errors}
                  name="checkPassword"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
                <S.SignUpInput placeholder="닉네임" {...register("nickName")} />
                <ErrorMessage
                  errors={errors}
                  name="nickName"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
            </S.SignUpFormInner>
            <CommonButton
              type="submit"
              variant="contained"
              color="secondary"
              disableFocusRipple={true}
              fullWidth
            >
              회원가입
            </CommonButton>
          </S.SignUpForm>
        </S.SignUpInner>
      </S.SignUpContainer>
    </>
  );
};

export default SignUp;

const S = {
  BackgroundColor: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px); */
  `,
  SignUpContainer: styled(modal)``,
  SignUpInner: styled(modalContent)``,
  SignUpTitle: styled.h1`
    font-size: 30px;
    line-height: 50px;
    letter-spacing: -2px;
  `,
  SignUpForm: styled.form``,
  SignUpFormInner: styled.ul`
    margin: 20px 0px 20px 0px;
  `,
  SignUpListItem: styled.li`
    margin-bottom: 13px;
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  InputContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  SignUpInput: styled.input`
    width: 100%;
    padding: 18px 0px;
    margin-bottom: 7px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 4px;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  ShowPasswordToggle: styled.button`
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -13px;
  `,
  SignUpErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
};

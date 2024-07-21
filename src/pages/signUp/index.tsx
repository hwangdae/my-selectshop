import { registerSchema } from "@/validators/auth";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import { ErrorMessage } from "@hookform/error-message";
import Eye from "@/assets/Eye.svg";
import EyeInvisible from "@/assets/EyeInvisible.svg";
import { AuthType, RegisterInput } from "@/types/authType";
import useToggle from "@/hook/useToggle";
import { CommonButton } from "@/styles/commonButton";

const SignUp = () => {
  const [showPassword, handlePasswordToggle] = useToggle(false);
  const [showCheckPassword, handleCheckPasswordToggle] = useToggle(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      nickName: "",
    },
  });

  const signupHandleSubmit: SubmitHandler<RegisterInput> = (data: AuthType) => {
    console.log(data);
    console.log(errors.email);
  };

  return (
    <S.SignUpContainer>
      <S.SignUpInner>
        <S.SignUpTitle>
          Welcome,
          <br />
          mySelectshop :)
        </S.SignUpTitle>
        <S.SignUpForm onSubmit={handleSubmit(signupHandleSubmit)}>
          <S.SignUpFormInner>
            <S.SignUpListItem>
              <S.SignUpInput placeholder="이메일 주소" {...register("email")} />
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
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? (
                    <Eye width="20px" height="auto" fill="#a0a0a0" />
                  ) : (
                    <EyeInvisible width="20px" height="auto" fill="#a0a0a0" />
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
          <CommonButton type="submit" variant="contained" disableFocusRipple={true} fullWidth>
            회원가입
          </CommonButton>
        </S.SignUpForm>
      </S.SignUpInner>
    </S.SignUpContainer>
  );
};

export default SignUp;

const S = {
  SignUpContainer: styled.div`
    position: relative;
  `,
  SignUpInner: styled.div`
    width: 360px;
    position: absolute;
    transform: translate(50%, 50%);
    border: solid 1px #000;
    border-radius: 4px;
    padding: 30px;
  `,
  SignUpTitle: styled.h1`
    font-size: 38px;
    font-weight: bold;
    line-height: 50px;
    letter-spacing: -2px;
  `,
  SignUpForm: styled.form``,
  SignUpFormInner: styled.ul`
    margin: 50px 0px 10px 0px;
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
    border: solid 1px #a0a0a0;
    border-radius: 3px;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: #a0a0a0;
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

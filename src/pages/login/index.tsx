import { getUser } from "@/api/user";
import { ModalProps } from "@/components/ModalMap";
import { userState } from "@/globalState/recoilState";
import supabase from "@/lib/supabaseClient";
import { CommonButton } from "@/styles/commonButton";
import { modal, modalContent } from "@/styles/modal";
import { styleFont } from "@/styles/styleFont";
import { RegisterLoginInput } from "@/types/authType";
import { registerLoginSchema } from "@/validators/auth";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Login = ({ onClose }: ModalProps) => {
  const [, setuserLogin] = useRecoilState(userState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterLoginInput>({
    resolver: zodResolver(registerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandleSubmit: SubmitHandler<RegisterLoginInput> = async ({
    email,
    password,
  }) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (user) {
        const userLogin = await getUser(user.id);
        setuserLogin(userLogin);
        alert("로그인이 완료 되었습니다.");
        router.push("/");
      }
      if (error) {
        alert("이메일과 비밀번호를 확인해 주세요.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const modalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.LoginContainer onClick={modalClose}>
      <S.LoginInner>
        <S.LoginTitle>
          시간 날 때 쇼핑하는 사람들,
          <span>마이 셀렉트샵</span>
        </S.LoginTitle>
        <S.LoginForm onSubmit={handleSubmit(loginHandleSubmit)}>
          <S.LoginFormInner>
            <S.LoginListItem>
              <S.LoginInput placeholder="이메일 주소" {...register("email")} />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <S.LoginErrorMessage>{message}</S.LoginErrorMessage>
                )}
              />
            </S.LoginListItem>
            <S.LoginListItem>
              <S.InputContainer>
                <S.LoginInput
                  type="password"
                  placeholder="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  {...register("password")}
                />
              </S.InputContainer>
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <S.LoginErrorMessage>{message}</S.LoginErrorMessage>
                )}
              />
            </S.LoginListItem>
          </S.LoginFormInner>
          <CommonButton
            type="submit"
            variant="contained"
            color="secondary"
            disableFocusRipple={true}
            fullWidth
          >
            로그인
          </CommonButton>
        </S.LoginForm>
        <S.SignUpLinkContainer>
          회원이 아니신가요? <button onClick={()=>router.push('?modal=signUp')}>회원가입</button>
        </S.SignUpLinkContainer>
      </S.LoginInner>
    </S.LoginContainer>
  );
};

export default Login;

const S = {
  LoginContainer: styled(modal)``,
  LoginInner: styled(modalContent)``,
  LoginTitle: styled.h1`
    font-size: 30px;
    line-height: 50px;
    letter-spacing: -2px;
    span {
      display: block;
      font-weight: bold;
    }
  `,
  LoginForm: styled.form``,
  LoginFormInner: styled.ul`
    margin: 30px 0px 10px 0px;
  `,
  LoginListItem: styled.li`
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  InputContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  LoginInput: styled.input`
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
  LoginErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
  SignUpLinkContainer: styled.div`
    ${styleFont.textsmall}
    color: #28323c;
    text-align: center;
    margin-top: 24px;
    letter-spacing: -0.5px;
    a {
      text-decoration: underline;
    }
  `,
};

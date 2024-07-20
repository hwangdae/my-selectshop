import useInput from "@/hook/useInput";
import { registerSchema } from "@/validators/auth";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { ErrorMessage } from "@hookform/error-message";

interface AuthType {
  email: string;
  password: string;
  checkPassword: string;
  nickName: string;
}

const SignUp = () => {
  type registerInput = z.infer<typeof registerSchema>;
  const { register, handleSubmit, formState: {errors} } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      nickName: "",
    },
  });

  const signupHandleSubmit = (data: AuthType) => {
    console.log(data);
    console.log(errors)
  };
  console.log(errors)
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
              {/* <label>아이디</label> */}
              <S.SignUpInput placeholder="이메일 주소" {...register("email")} />
              <p>{errors.email?.message}</p>
            </S.SignUpListItem>
            <S.SignUpListItem>
              {/* <label>비밀번호</label> */}
              <S.SignUpInput
                placeholder="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                {...register("password")}
              />
            </S.SignUpListItem>
            <S.SignUpListItem>
              {/* <label>비밀번호 확인</label> */}
              <S.SignUpInput
                placeholder="비밀번호 재입력"
                {...register("checkPassword")}
              />
            </S.SignUpListItem>
            <S.SignUpListItem>
              {/* <label>닉네임</label> */}
              <S.SignUpInput placeholder="닉네임" {...register("nickName")} />
            </S.SignUpListItem>
          </S.SignUpFormInner>
          <Button variant="contained">회원가입</Button>
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
    padding: 40px;
  `,
  SignUpTitle: styled.h1`
    font-size: 34px;
    font-weight: bold;
    line-height: 40px;
    letter-spacing: -2px;
  `,
  SignUpForm: styled.form`
  `,
  SignUpFormInner: styled.ul`
    margin: 30px 0px;
  `,
  SignUpListItem: styled.li`
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  SignUpInput: styled.input`
  width: 100%;
    padding: 16px 0px;
    text-indent: 6px;
    outline: none;
  `,
};

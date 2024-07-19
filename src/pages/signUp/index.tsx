import useInput from "@/hook/useInput";
import React, { ChangeEvent, useState } from "react";

const SignUp = () => {
  const [id, handleIdChange] = useInput();
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const onchangeIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    console.log(value)
  }

  return (
    <div>
      <h1>
        Welcome,
        <br />
        mySelectshop :)
      </h1>
      <form>
        <label>아이디</label>
        <input value={id} onChange={handleIdChange}></input>
        <label>비밀번호</label>
        <input value={password}></input>
        <label>비밀번호 확인</label>
        <input value={checkPassword}></input>
        <label>닉네임</label>
        <input value={nickName}></input>
      </form>
    </div>
  );
};

export default SignUp;

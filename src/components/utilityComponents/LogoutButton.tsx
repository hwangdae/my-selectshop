import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { logOut } from "@/api/user";

const LogoutButton = () => {
  const router = useRouter();

  const logoutHandleSubmit = async () => {
    try {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        await logOut();
        alert("로그아웃 되었습니다.");
        window.location.reload();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={logoutHandleSubmit}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;

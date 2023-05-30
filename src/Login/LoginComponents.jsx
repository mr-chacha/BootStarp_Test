import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginComponents() {
  const AUTH = process.env.REACT_APP_AUTH;
  //네비게이트
  const navigate = useNavigate();
  // DB에서 데이터 가져오기

  const fetchData = async () => {
    const admin = {
      id: loginId,
      password: loginPw,
    };
    try {
      const response = await axios.post(AUTH, admin);
      Cookies.set("accessToken", response?.data?.access_token); // 쿠키에 액세스 토큰 저장
      if (!loginId === "pango") {
        alert("아이디를 확인하세요");
        return;
      }
      if (!loginPw === "vkdrh!0303") {
        alert("비밀번호를 확인하세요");
        return;
      }
      alert("로그인이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  //아이디
  const [loginId, setLoginId] = useState("");
  const idonChange = (event) => {
    setLoginId(event.target.value);
  };

  //비밀번호
  const [loginPw, setLoginPw] = useState();
  const pwonChange = (event) => {
    setLoginPw(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "500px",
      }}
    >
      아이디 :
      <input
        placeholder="아이디를 입력하세요"
        value={loginId}
        onChange={idonChange}
        type="text"
      />
      비밀번호 :
      <input
        placeholder="비밀번호를 입력하세요"
        value={loginPw}
        onChange={pwonChange}
        // type="password"
        type="text"
      />
      <button onClick={fetchData}>로그인 하기</button>
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginComponents() {
  //네비게이트
  const navigate = useNavigate();
  //디비에 있는걸 전부가져온뒤
  const [data, setData] = useState([]);
  // DB에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //아이디
  const [loginId, setLoginId] = useState("");
  const idonChange = (event) => {
    setLoginId(event.target.value);
    console.log(loginId);
  };

  //비밀번호
  const [loginPw, setLoginPw] = useState();
  const pwonChange = (event) => {
    setLoginPw(event.target.value);
    console.log(loginId);
  };

  //로그인함수
  const adminLogin = () => {
    if (loginId !== data[0]?.id) {
      alert("아이디를 확인하세요");
      return;
    }
    if (loginPw !== data[0]?.password) {
      alert("비밀번호를 확인하세요");
      return;
    }
    if (loginId === data[0]?.id && loginPw === data[0]?.password) {
      alert("로그인 성공");
    }
    sessionStorage.setItem("admin", "로그인완료");
    navigate("/");
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          alignContent: "center",
          justifyContent: "center",
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
          type="password"
        />
        <button onClick={adminLogin}>로그인 하기</button>
      </form>
    </div>
  );
}

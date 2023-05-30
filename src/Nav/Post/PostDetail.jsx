import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
export default function PostDetail() {
  //DB
  const DB = process.env.REACT_APP_DB;

  const navigate = useNavigate();
  const [post, setPosts] = useState([]);
  //수정페이지로 이동
  const navigateTo = () => {
    navigate(`/postedit/${post.id}`);
  };
  //홈페이지 아이디
  const param = useParams();
  //로그인 토큰
  const token = Cookies.get("accessToken");
  //등록된 post 가져와서 posts에 담기
  const postGet = async () => {
    try {
      const response = await axios.get(`${DB}?id=${param.id}`);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postGet();
  }, []);

  //삭제함수
  const handleDelete = async () => {
    //확인 버튼을 누르면 실행될 코드
    if (window.confirm("정말 삭제하겠습니까?")) {
      try {
        await axios.delete(`${DB}/?id=${param.id}`, {
          headers: {
            access_token: token,
          },
        });
        if (post?.category === "공지사항") {
          navigate("/post");
        } else {
          navigate("/company");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // 취소 버튼을 누른 경우 실행될 코드
      console.log("취소 버튼을 눌렀습니다.");
      return;
    }
  };
  //로그인 여부 확인
  const Login = Cookies.get("accessToken");
  // 공지사항 검색
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1> 글제목 :{post?.title}</h1>
      {post?.category === "공지사항" ? (
        ""
      ) : (
        <img src={post?.titleImg} style={{ width: "500px", height: "auto" }} />
      )}
      <ReactQuill
        value={post?.contents}
        readOnly={true}
        theme="snow"
        className="quill"
        modules={{ toolbar: false }} // 툴바 제거
      />
      {Login ? (
        <>
          <button onClick={navigateTo}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

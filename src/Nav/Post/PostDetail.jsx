import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  // 글 조회하는 함수들
  const [posts, setPosts] = useState([]);
  const handleGet = () => {
    axios
      .get("http://localhost:3001/post") // 서버주소
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
        // 오류 처리
      });
  };
  //파람즈로 도메인의 아이디값을 가져와서 json에 있는 아이디랑 같은것만 post라는 변수에 담아서 사용함
  const param = useParams();
  const post = posts.find((id) => id.id === param.id);
  console.log("data", post);
  useEffect(() => {
    handleGet();
  }, []);

  console.log(post?.title);
  return (
    <div>
      <div
        style={{ width: "1000", height: "100%" }}
        dangerouslySetInnerHTML={{ __html: post?.title }}
      ></div>
    </div>
  );
}

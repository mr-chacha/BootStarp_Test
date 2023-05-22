import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function PostDetail() {
  // 글 조회하는 함수들
  const [posts, setPosts] = useState([]);
  const handleGet = async () => {
    try {
      const response = await axios.get("http://localhost:3001/post");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };

  //파람즈로 도메인의 아이디값을 가져와서 json에 있는 아이디랑 같은것만 post라는 변수에 담아서 사용함
  const param = useParams();
  const post = posts.find((id) => id.id === param.id);

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <div
        className="quill"
        dangerouslySetInnerHTML={{ __html: post?.title }}
      ></div> */}
      <ReactQuill
        value={post?.contents}
        readOnly={true}
        theme="snow"
        className="quill"
        modules={{ toolbar: false }} // 툴바 제거
      />
    </div>
  );
}

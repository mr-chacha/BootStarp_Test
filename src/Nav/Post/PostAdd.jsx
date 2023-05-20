import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function PostAdd() {
  // Quill 글작성 에디터

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // 글씨 폰트 크기 옵션
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { color: [] }, // 글자 색상 옵션
        { background: [] }, // 글자 배경색 옵션
      ], // 굵게, 기울기, 밑줄, 가운데줄, 따옴표
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }], //리스트 숫자, 리스트 도트
      ["link", "image", "video"], // 링크, 이미지, 비디오 첨부
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const [title, setTitle] = useState("");
  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handlePost = () => {
    const data = {
      id: uuidv4(),
      index: 0,
      category: "test",
      title: title,
      admin: "팡고",
      date: new Date().toISOString(),
      count: 1,
    };

    axios
      .post("http://localhost:3001/post", data) // 서버 주소와 엔드포인트에 맞게 수정해주세요
      .then((response) => {
        console.log(response.data); // 성공적으로 등록된 데이터 확인
        // 추가적인 로직 구현
        alert("글등록 성공");
      })
      .catch((error) => {
        console.error(error);
        // 오류 처리
        alert("글등록 실패");
      });
  };

  return (
    <div>
      <h1>글작성 페이지</h1>

      <from>
        <div style={{ display: "flex" }}>
          <h2 style={{ marginRight: "20px" }}>제목 : </h2>

          <input placeholder="제목을 입력해주세요" />
        </div>
        <div>
          <ReactQuill
            value={title}
            onChange={handleTitleChange}
            modules={modules}
          />
        </div>
        <button onClick={handlePost}> 글 등록</button>
        <button>취소</button>
      </from>
    </div>
  );
}

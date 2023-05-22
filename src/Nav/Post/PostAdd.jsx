import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";

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

  //게시글 등록
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("");
  const [titleImg, setTitleImg] = useState(null);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentsChange = (value) => {
    setContents(value);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTitleImg(file);
  };

  // const handlePost = () => {
  //   const data = {
  //     id: uuidv4(),
  //     index: 0,
  //     category: category,
  //     title: title,
  //     titleImg: titleImg,
  //     contents: contents,
  //     admin: "팡고",
  //     date: new Date().toISOString(),
  //     count: 1,
  //   };
  //   if (category === "공지사항") {
  //     axios
  //       .post("http://localhost:3001/post", data) // 서버 주소와 엔드포인트에 맞게 수정해주세요
  //       .then((response) => {
  //         console.log(response.data); // 성공적으로 등록된 데이터 확인
  //         // 추가적인 로직 구현
  //         alert("글등록 성공");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // 오류 처리
  //         alert("글등록 실패");
  //       });
  //   }
  //   if (category === "팡고소식") {
  //     axios
  //       .post("http://localhost:3001/news", data) // 서버 주소와 엔드포인트에 맞게 수정해주세요
  //       .then((response) => {
  //         console.log(response.data); // 성공적으로 등록된 데이터 확인
  //         // 추가적인 로직 구현
  //         alert("글등록 성공");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // 오류 처리
  //         alert("글등록 실패");
  //       });
  //   }
  // };

  //이미지 미리보기
  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (event) => {
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  const handlePost = () => {
    const data = {
      id: uuidv4(),
      index: 0,
      category: category,
      title: title,
      titleImg: fileImage,
      contents: contents,
      admin: "팡고",
      date: new Date().toISOString(),
      count: 1,
    };

    if (category === "공지사항") {
      axios
        .post("http://localhost:3001/post", data)
        .then((response) => {
          console.log(response.data);
          alert("글 등록 성공");
        })
        .catch((error) => {
          console.error(error);
          alert("글 등록 실패");
        });
    }
    if (category === "팡고소식") {
      axios
        .post("http://localhost:3001/news", data)
        .then((response) => {
          console.log(response.data);
          alert("글 등록 성공");
        })
        .catch((error) => {
          console.error(error);
          alert("글 등록 실패");
        });
    }
  };
  //

  return (
    <div>
      <h1>이미지 업로드 </h1>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          name="imggeUpload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={saveFileImage}
        />
      </div>
      <div>
        <h1>미리보기 이미지</h1>
      </div>
      <div>
        {/* 이미지 미리보기 */}
        {fileImage && (
          <img
            alt="sample"
            src={fileImage}
            style={{ width: "1000px", height: "auto" }}
          />
        )}
        <button
          style={{
            width: "50px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => deleteFileImage()}
        >
          삭제
        </button>
      </div>

      <h1>글작성 페이지</h1>
      <input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
        type="text"
      />

      <div>
        <p> 카테고리 </p>
        <Form>
          {["checkbox"].map((type) => (
            <div
              key={`default-${type}`}
              className="mb-3"
              style={{ display: "flex", gap: "10px" }}
            >
              <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={"공지사항"}
                value={"공지사항"}
                onChange={handleChange}
              />
              <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={"팡고소식"}
                value={"팡고소식"}
                onChange={handleChange}
              />
            </div>
          ))}
        </Form>
      </div>
      <div>
        <ReactQuill
          value={contents}
          onChange={handleContentsChange}
          modules={modules}
        />
      </div>
      <button onClick={handlePost}> 글 등록</button>
      <button>취소</button>
    </div>
  );
}

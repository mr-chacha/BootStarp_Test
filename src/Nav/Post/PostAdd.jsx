import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PostAdd() {
  //네비게이트
  const navigate = useNavigate();
  //Quill Ref로 dom 직접관여
  const quillRef = useRef();
  // Quill의 모듈 설정
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            { color: [] }, // 글자 색상 옵션
            { background: [] }, // 글자 배경색 옵션
          ],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }], //리스트 숫자, 리스트 도트, 글자정렬
          ["link", "image", "video"],
        ],

        handlers: {
          // 이미지 처리는 직접하기
          image: () => {
            const fileInput = document.getElementById("file-input");
            fileInput.click();
          },
        },
      },
    };
  }, []);

  // 썸네일 이미지 미리보기
  const [titleImage, setTitleImage] = useState("");
  const fileRef = useRef();

  // 썸네일 이미지 취소함수
  const deleteFileImage = () => {
    URL.revokeObjectURL(titleImage);
    setTitleImage("");
  };

  //게시글 등록
  //제목
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  //내용
  const [contents, setContents] = useState("");
  const handleContentsChange = (value) => {
    setContents(value);
  };
  //카테고리
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  //게시글 등록 함수
  const handlePost = () => {
    const data = {
      id: uuidv4(),
      index: 0,
      category: category,
      title: title,
      titleImg: titleImage,
      contents: contents,
      admin: "팡고",
      date: new Date().toISOString(),
      count: 1,
    };
    if (!title || !contents) {
      alert("제목 또는 내용을 입력해주세요");
      return;
    }
    if (!category) {
      alert("카테고리를 설정해주세요");
      return;
    }

    if (category === "팡고소식") {
      if (!titleImage) {
        alert("썸네일 추가해주세요");
        return;
      }
    }
    axios
      .post("http://localhost:3001/post", data)
      .then((response) => {
        console.log(response.data);
        alert("글 등록 성공");
        //글작성후 상세페이지로 이동
        navigate(`/postdetail/${data.id}`);
      })
      .catch((error) => {
        console.error(error);
        alert("글 등록 실패");
      });
  };

  // base64 >> Quill Img Url 로 변경하는 onChange
  const onFileUpload = async (event) => {
    const ACCESS_KEY = process.env.ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
    const REGION = process.env.REGION;
    const S3_BUCKET = process.env.S3_BUCKET;

    // AWS ACCESS KEY를 세팅
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

    // 파일과 파일이름을 넘겨줌
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      //파일 이름이 겹치지않게 uuid 사용
      Key: uuidv4(),
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        const { Bucket, Key } = params;
        //이미지의 url
        const requestUrl = `https://${Bucket}.s3.ap-northeast-2.amazonaws.com/${Key}`;
        //에디터 객체를 가져옴
        const editor = quillRef.current.getEditor();
        //에디터 커서 위치값을 가져온뒤
        const range = editor.getSelection();
        //원래 위치에 이미지를 삽입함
        editor.insertEmbed(range, "image", requestUrl);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  // base64 >> Title Img Url 로 변경하는 onChange
  const onTitleImgUpload = async (event) => {
    const ACCESS_KEY = "AKIATNGWND7GCOYJREO5";
    const SECRET_ACCESS_KEY = "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";
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "chacha-upload-img";

    // AWS ACCESS KEY를 세팅
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

    // 파일과 파일이름을 넘겨줌
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      //파일 이름이 겹치지않게 uuid 사용
      Key: uuidv4(),
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        const { Bucket, Key } = params;
        //이미지의 url
        const requestUrl = `https://${Bucket}.s3.ap-northeast-2.amazonaws.com/${Key}`;
        setTitleImage(requestUrl);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  // 카테고리 설정에 따른 썸네일 이미지 업로드 칸 스타일처리
  useEffect(() => {
    if (category === "팡고소식") {
      fileRef.current.style.display = "block";
    } else {
      fileRef.current.style.display = "none";
    }
  }, [category]);

  return (
    <div>
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
          {["radio"].map((type) => (
            <div className="mb-3">
              <Form.Check
                label={"공지사항"}
                value={"공지사항"}
                name="group1"
                type={type}
                onChange={handleChange}
              />
              <Form.Check
                label={"팡고소식"}
                value={"팡고소식"}
                name="group1"
                type={type}
                onChange={handleChange}
              />
            </div>
          ))}
        </Form>
      </div>

      <div ref={fileRef} style={{ display: "none" }}>
        <h1>썸네일 이미지 업로드 </h1>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onTitleImgUpload}
          />
        </div>
        <div>
          <h1>썸네일 미리보기</h1>
        </div>
        <div>
          {/* 이미지 미리보기 */}
          {titleImage && (
            <img
              alt="sample"
              src={titleImage}
              style={{ width: "500px", height: "auto" }}
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
      </div>

      <input
        type="file"
        onChange={onFileUpload}
        style={{ display: "none" }}
        id="file-input"
      />
      <div>
        <ReactQuill
          ref={quillRef}
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

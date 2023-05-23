import React, { useMemo, useRef, useState } from "react";
import AWS from "aws-sdk";
import ReactQuill from "react-quill";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";

export default function Pr() {
  // Quill editor 탭
  // Quill foramts을
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];
  const quillRef = useRef();

  //Quill modules
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
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }], //리스트 숫자, 리스트 도트
          ["link", "image", "video"],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: () => {
            const fileInput = document.getElementById("file-input");
            fileInput.click();
          },
        },
      },
    };
  }, []);

  // base64 >> Img Url 로 변경하는 onChange
  const onFileUpload = async (event) => {
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
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        alert("SUCCESS");
        console.log("params", params);
      })
      .send((err) => {
        if (err) console.log(err);
      });

    const { Bucket, Key } = params;
    //이미지의 url
    const requestUrl = `https://${Bucket}.s3.ap-northeast-2.amazonaws.com/${Key}`;

    console.log("requestUrls", requestUrl);
    //에디터 객체를 가져옴
    const editor = quillRef.current.getEditor();
    //에디터 커서 위치값을 가져온뒤
    const range = editor.getSelection();
    //원래 위치에 이미지를 삽입함
    editor.insertEmbed(range, "image", requestUrl);
  };

  // 디비에 등록하지않고 url 만들기로 테스트중인 함수
  const [fileImages, setFileImages] = useState("");
  const onFileUploads = async (event) => {
    setFileImages(URL.createObjectURL(event.target.files[0]));

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

    //이미지의 url
    const requestUrl = URL.createObjectURL(event.target.files[0]);
    const testUrl = `blob:http://localhost:3003/e21bcff5-4f6b-4b82-8f8d-fc591593059f`;
    const test = testUrl.replace("blob:", "");

    console.log("requestUrl", test);
    //에디터 객체를 가져옴
    const editor = quillRef.current.getEditor();
    //에디터 커서 위치값을 가져온뒤
    const range = editor.getSelection();
    //원래 위치에 이미지를 삽입함
    editor.insertEmbed(range, "image", test);
  };

  //썸네일 이미지 미리보기
  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (event) => {
    // img 아이콘이 눌리면 실행됨 하나씩 URL로 변경할거임
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  //게시글 등록 탭
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
  //게시글 등록
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

  return (
    <div>
      {/*   // 디비에 등록하지않고 url 만들기로 테스트중인 함수 */}
      <input type="file" onChange={onFileUploads} id="file-input" />

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
      <input
        type="file"
        onChange={onFileUpload}
        style={{ display: "none" }}
        id="file-input"
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="플레이스 홀더"
        value={contents}
        onChange={handleContentsChange}
        modules={modules}
        formats={formats}
      />
      <button onClick={handlePost}>등록</button>
    </div>
  );
}

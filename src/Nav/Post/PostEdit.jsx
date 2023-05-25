import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import { useNavigate, useParams } from "react-router-dom";

export default function PostEdit() {
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
      //파일 이름이 겹치지않게 uuid 사용
      Key: uuidv4(),
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
    //에디터 객체를 가져옴
    const editor = quillRef.current.getEditor();
    //에디터 커서 위치값을 가져온뒤
    const range = editor.getSelection();
    //원래 위치에 이미지를 삽입함
    editor.insertEmbed(range, "image", requestUrl);
  };

  // post 조회하는 함수들
  const [posts, setPosts] = useState();
  //파람즈로 도메인의 아이디값을 가져와서 json에 있는 아이디랑 같은것만 post라는 변수에 담아서 사용함
  const param = useParams();
  const post = posts?.find((id) => id?.id === param?.id);
  const postGet = async () => {
    const response = await axios.get("http://localhost:3001/post");
    setPosts(response.data);
    return;
  };
  useEffect(() => {
    postGet();
  }, []);

  //제목 수정
  const [editTitle, setEditTitle] = useState(post?.title);
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditTitle(newTitle);
  };

  //내용 수정
  const [editContent, setEditContent] = useState(post?.contents);
  const handleContentsChange = (value) => {
    const newContent = value;
    setEditContent(newContent);
  };

  //카테고리 수정
  const [editCategory, setEditCategory] = useState("");
  const handleCategoryChange = (event) => {
    setEditCategory(event.target.value);
  };

  // 썸네일 이미지 미리보기
  const [edtiTitleImage, setEditTitleImage] = useState("");
  const fileRef = useRef();
  // 썸네일 이미지 등록함수
  const saveFileImage = (event) => {
    setEditTitleImage(URL.createObjectURL(event.target.files[0]));
  };
  // 썸네일 이미지 취소함수
  const deleteFileImage = () => {
    URL.revokeObjectURL(edtiTitleImage);
    setEditTitleImage("");
  };

  //수정완료 버튼
  const handleUpdatePost = () => {
    if ((!editTitle && !post?.title) || (!editContent && !post?.contents)) {
      alert("제목 또는 내용을 입력해주세요");
      return;
    }
    if (!editCategory && post?.category) {
      alert("카테고리를 설정해주세요");
      return;
    }
    const editData = {
      id: post?.id,
      index: 0,
      category: editCategory === undefined ? post?.category : editCategory,
      title: editTitle === undefined ? post?.title : editTitle,
      titleImg: !edtiTitleImage
        ? post?.titleImg
        : edtiTitleImage || !post?.titleImg
        ? edtiTitleImage
        : post?.titleImg,
      contents: editContent === undefined ? post?.contents : editContent,
      admin: "팡고",
      date: post?.date,
      count: 1,
    };

    axios
      .put(`http://localhost:3001/post/${param?.id}`, editData)
      .then((response) => {
        console.log(response.data);
        alert("글 수정 성공");
        //글작성후 상세페이지로 이동
        navigate(`/postdetail/${editData.id}`);
      })
      .catch((error) => {
        console.error(error);
        alert("글 등록 실패");
      });
  };

  // 카테고리 설정에 따른 썸네일 이미지 업로드 칸 스타일처리
  useEffect(() => {
    if (editCategory === "팡고소식") {
      fileRef.current.style.display = "block";
    } else {
      fileRef.current.style.display = "none";
    }
  }, [editCategory]);
  return (
    <div>
      <h1>글수정 페이지</h1>
      <input
        placeholder="제목을 입력하세요"
        value={editTitle === undefined ? post?.title : editTitle}
        onChange={handleTitleChange}
        type="text"
      />
      <div>
        <p> 카테고리 </p>
        <Form>
          {["radio"].map((type) => (
            <div className="mb-3" key={type}>
              <Form.Check
                label={"공지사항"}
                value={"공지사항"}
                name="group1"
                type={type}
                onChange={handleCategoryChange}
              />
              <Form.Check
                label={"팡고소식"}
                value={"팡고소식"}
                name="group1"
                type={type}
                onChange={handleCategoryChange}
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
            name="imggeUpload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={saveFileImage}
          />
        </div>
        <div>
          <h1>썸네일 미리보기</h1>
        </div>
        <div>
          {/* 이미지 미리보기 */}
          {edtiTitleImage || post?.titleImg ? (
            <img
              alt="sample"
              src={
                !edtiTitleImage
                  ? post?.titleImg
                  : edtiTitleImage || !post?.titleImg
                  ? edtiTitleImage
                  : post?.titleImg
              }
              style={{ width: "500px", height: "auto" }}
            />
          ) : (
            ""
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
          value={editContent === undefined ? post?.contents : editContent}
          onChange={handleContentsChange}
          modules={modules}
        />
      </div>
      <button onClick={handleUpdatePost}>수정하기</button>
    </div>
  );
}

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

export default function Test() {
  const [contents, setContents] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleContentsChange = (value) => {
    setContents(value);
  };

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { color: [] },
        { background: [] },
      ],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
      ["link", "image", "video"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };

  function onFileUpload() {
    const ACCESS_KEY = "AKIATNGWND7GCOYJREO5";
    const SECRET_ACCESS_KEY = "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";
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "chacha-upload-img";

    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3();

    const file = new File([contents], "image.jpg", { type: "image/jpeg" });

    const params = {
      ACL: "public-read",
      Bucket: S3_BUCKET,
      Key: `${Date.now()}_${file.name}`,
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Upload successful:", data.Location);
        setUploadedImageUrl(data.Location); // 업로드된 이미지 URL 저장
      }
    });
  }

  function downloadImage() {
    if (uploadedImageUrl) {
      const link = document.createElement("a");
      link.href = uploadedImageUrl;
      link.download = "image.jpg";
      link.click();
    }
  }

  return (
    <div>
      <div>
        <ReactQuill
          value={contents}
          onChange={handleContentsChange}
          modules={modules}
        />
      </div>

      <img src="https://chacha-upload-img.s3.ap-northeast-2.amazonaws.com/01.png" />
      <button onClick={onFileUpload}>Upload</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
}

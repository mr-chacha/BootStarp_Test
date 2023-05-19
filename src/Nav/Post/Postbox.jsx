import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Postbox({ item }) {
  //해당페이지의 디테일 페이지로 이동하는 함수
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/postdetail/${item.id}`);
  };

  //타이틀 분리하는 코드
  const startTag = '<span class="ql-size-huge">';
  const endTag = "</span>";
  const startIndex = item.title.indexOf(startTag);
  const endIndex = item.title.indexOf(endTag);
  const filteredText = item.title.substring(
    startIndex + startTag.length,
    endIndex
  );

  return (
    <CommentWrap>
      <TableTd Width="50px" Color="fff">
        1
      </TableTd>
      <TableTd TableTd Width="60px" Color="fff">
        카테고리
      </TableTd>
      <TableTds Width="450px" Color="fff">
        <span onClick={navigateTo}>{filteredText}</span>
        {/* 누적댓글수 */}
        <PostCount>1</PostCount>
        {/* 포스트 작성한지 30분이 지날때면 스타일을 주기 */}
        <PostNew>N</PostNew>
      </TableTds>
      <TableTdName Width="130px" Color="#A7A9AC">
        이름
      </TableTdName>
      <TableTd Width="80px" Color="#A7A9AC">
        작성시간
      </TableTd>
      <TableTd Width="65px" Color="#A7A9AC">
        2
      </TableTd>
    </CommentWrap>
  );
}

const TableTdName = styled.td`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 13px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  p:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

const CommentWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #777d87;
`;
const TableTd = styled.td`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 13px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const TableTds = styled.td`
  color: ${(props) => props.Color};
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 50px;
  font-weight: 400;
  font-size: 13px;
  span {
    margin-left: 20px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const PostCount = styled.div`
  font-size: 11px;
  color: #00b8c8;
  margin-left: 8px;
  margin-top: 2px;
`;
const PostNew = styled.div`
  font-size: 11px;
  margin-left: 5px;
  width: 14px;
  height: 14px;
  background-color: #f05656;
  color: #fff;
  line-height: 14px;
  text-align: center;
  border-radius: 10px;
`;

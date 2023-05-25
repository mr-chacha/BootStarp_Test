import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { styled } from "styled-components";
import Postbox from "./Postbox";
import axios from "axios";

export default function Post() {
  // Pagination
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  // 글 조회하는 함수들
  const [data, setData] = useState([]);
  //카테고리가 팡고소식인거만 모아줌
  const post = data.filter((post) => post?.category === "공지사항");
  // DB에서 데이터 가져오기
  const handleGet = () => {
    axios
      .get("http://localhost:3001/post") // 서버주소
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        // 오류 처리
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <CommunityLayout>
      <h1>공지사항</h1>
      <CommentsWrap>
        <CommunityAddArea>
          <AddPostBtn>
            <Link to="/postadd" className="nav-link">
              글작성
            </Link>
          </AddPostBtn>
        </CommunityAddArea>
        <CommunityeHeader>
          <HeaderTh style={{ padding: "0px 16px" }}>번호</HeaderTh>
          <HeaderTh>카테고리</HeaderTh>
          <HeaderTh style={{ padding: "0px 250px 0px 232px" }}>제목</HeaderTh>
          <HeaderTh>작성자</HeaderTh>
          <HeaderTh style={{ padding: "0px 32px 0px 49px" }}>작성시간</HeaderTh>
          <HeaderTh>조회수</HeaderTh>
        </CommunityeHeader>
        {/* 여기서 맵을 돌릴거 */}
        {post.map((item) => {
          return <Postbox item={item} key={item} />;
        })}

        <CommunityFooter>
          <CommunitySerchBar>
            <CommunitySerchinput placeholder="게시글검색" />
          </CommunitySerchBar>
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={10}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </PaginationBox>
        </CommunityFooter>
      </CommentsWrap>
    </CommunityLayout>
  );
}

const CommunityLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentsWrap = styled.div`
  min-height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CommunityeHeader = styled.div`
  height: 50px;
  border-top: 2px solid #00b8c8;
  border-bottom: 1px solid #a7a9ac;
  display: flex;
  flex-direction: row;
  width: 836px;
`;

const HeaderTh = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 14px;
  font-weight: 500;
`;

const CommunityAddArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const AddPostBtn = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  width: 60px;
  height: 30px;
  background: #00b8c8;
  border-radius: 8px;
`;

const CommunityFooter = styled.div`
  margin-bottom: 170px;
  display: flex;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CommunitySerchBar = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 280px;
  height: 32px;
  background-color: #404b5e;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const CommunitySerchinput = styled.input`
  border: none;
  background: transparent;
  color: #fff;
  width: 255px;
  padding: 0px 10px;
`;

const PaginationBox = styled.div`
  width: 300px;
  .pagination {
    display: flex;
    justify-content: center;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #a5a5a5;
  }
`;

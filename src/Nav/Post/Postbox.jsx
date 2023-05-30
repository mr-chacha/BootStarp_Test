import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Postbox({ item, index, im }) {
  //해당페이지의 디테일 페이지로 이동하는 함수
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/postdetail/${item?.id}`);
  };

  const date = item?.date;
  const NewDate = date.slice(0, 10);

  //작성시간 몇분전인지 확인 monents.js 사용함
  const getDayMinuteCounter = () => {
    if (!Date) {
      return "";
    }

    //포스트 작성한시간
    const postingDate = moment(item?.date);
    const dayDiff = postingDate.diff(postingDate, "days");
    const hourDiff = postingDate.diff(postingDate, "hours");
    const minutesDiff = postingDate.diff(postingDate, "minutes");
    if (dayDiff === 0 && hourDiff === 0 && minutesDiff === 0) {
      // 작성한지 1분도 안지났을때
      return "방금전";
    }
    if (dayDiff === 0 && hourDiff === 0) {
      // 작성한지 1시간도 안지났을때
      const minutes = Math.ceil(-minutesDiff);
      return minutes + "분 전"; // '분' 로 표시
    }
    if (dayDiff === 0 && hourDiff <= 24) {
      // 작성한지 1시간은 넘었지만 하루는 안지났을때,
      const hour = Math.ceil(-hourDiff);
      return hour + "시간 전"; // '시간'으로 표시
    }
    return NewDate;
  };

  //만들어준 함수를 변수에 할당하여서 사용함
  const dayMinuteCounter = getDayMinuteCounter(NewDate);

  // new 태그 달아주기
  const newPosts = () => {
    if (!Date) {
      return "";
    }
    const today = moment();
    //포스트 작성한시간
    const postingDate = moment(item?.date);
    const weeksDiff = postingDate.diff(today, "weeks");
    // 작성한지 2주가 안된 포스트에는 N이 보이게해줌
    if (weeksDiff > -2) {
      return "N";
    }
  };

  // new태그
  const newPost = newPosts(new Date("2023-03-02T12:00:00"));

  return (
    <CommentWrap>
      <TableTd Width="50px" Color="fff">
        {index}
      </TableTd>
      <TableTd TableTd Width="60px" Color="fff">
        {item?.category}
      </TableTd>
      <TableTds Width="450px" Color="fff">
        <span onClick={navigateTo}>{item?.title}</span>

        {/* 포스트 작성한지 30분이 지날때면 스타일을 주기 */}
        {newPost ? <PostNew>N</PostNew> : ""}
      </TableTds>
      <TableTdName Width="130px" Color="#A7A9AC">
        팡고
      </TableTdName>
      <TableTd Width="80px" Color="#A7A9AC">
        {dayMinuteCounter}
      </TableTd>
      <TableTd Width="65px" Color="#A7A9AC">
        {item?.count}
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

const Postimportant = styled.div`
  font-size: 13px;
  margin-left: 5px;
  width: 100%;
  height: 20px;
  background-color: #f05656;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
`;

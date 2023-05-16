import React from "react";
import { styled } from "styled-components";

export default function FooterComponents() {
  return (
    <FooterDiv>
      <FooterP>이용약관 개인정보처리방침</FooterP>
      <p>팡고지와이(주)</p>
      <p>
        대표자 : 고성엽 , 유승재 사업자 등록번호 : 740-87-01471 TEL. 02)535-8398
        FAX. 02)516-941
      </p>
      <p>
        주소 : 서울특별시 강남구 강남대로 464, 410호
        통신팜애업번호:2020-서울서초-1362호
      </p>
    </FooterDiv>
  );
}
const FooterDiv = styled.div`
  margin-top: 30px;
`;
const FooterP = styled.div`
  border-top: 0.5px solid gray;
  border-bottom: 0.5px solid gray;
  margin-bottom: 10px;
  padding: 5px 0px;
`;

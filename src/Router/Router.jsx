import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import MyImage from "../Image/1.jpeg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainComponents from "../Main/MainComponents";
import ProductsComponents from "../Nav/Product/ProductsComponents";
import SolutionComponents from "../Nav/Solution/SolutionComponents";
import CompanyComponents from "../Nav/Company/CompanyComponents";
import NavComponents from "../Nav/NavComponents";
import FooterComponents from "../Footer/FooterComponents";
import ContactComponents from "../Nav/Contact/ContactComponents";
import { styled } from "styled-components";
import Post from "../Nav/Post/Post";
import PostAdd from "../Nav/Post/PostAdd";
import PostEdit from "../Nav/Post/PostEdit";
import PostDetail from "../Nav/Post/PostDetail";
import LoginComponents from "../Login/LoginComponents";
export default function AppRouter() {
  //width 값
  const [width, setWidth] = useState(window.innerWidth);

  // width 값이 변할때마다 바로 캐치하게함
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  // 더보기 버튼

  return (
    <Layout>
      <Router>
        <NavComponents />
        <div style={{ marginTop: "100px" }}>
          <Routes>
            <Route path="/" element={<MainComponents />} />
            <Route path="/product" element={<ProductsComponents />} />
            <Route path="/solution" element={<SolutionComponents />} />
            <Route path="/company" element={<CompanyComponents />} />
            <Route path="/contact" element={<ContactComponents />} />
            <Route path="/post" element={<Post />} />
            <Route path="/postadd" element={<PostAdd />} />
            <Route path="/postedit/:id" element={<PostEdit />} />
            <Route path="/postdetail/:id" element={<PostDetail />} />
            <Route path="/vkdrhfhrmdls/" element={<LoginComponents />} />
          </Routes>
        </div>
        <FooterComponents />
      </Router>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0px 20px;
`;

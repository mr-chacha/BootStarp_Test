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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              paddingTop: "50px",
            }}
          >
            <Routes>
              <Route path="/" element={<MainComponents />} />
              <Route path="/product" element={<ProductsComponents />} />
              <Route path="/solution" element={<SolutionComponents />} />
              <Route path="/company" element={<CompanyComponents />} />
              <Route path="/contact" element={<ContactComponents />} />
            </Routes>
          </div>
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
  max-width: 1920px;
  padding: 0px 20px;
`;

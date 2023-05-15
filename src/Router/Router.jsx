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
  const [more, setMore] = useState(12);
  // 더보기 버튼
  const moreClick = () => [setMore(more + 6)];
  return (
    <div>
      <Router>
        <NavComponents />
        <Routes>
          <Route path="/" element={<MainComponents />} />
          <Route path="/product" element={<ProductsComponents />} />
          <Route path="/solution" element={<SolutionComponents />} />
          <Route path="/company" element={<CompanyComponents />} />
        </Routes>
        <FooterComponents />
      </Router>
    </div>
  );
}

// ------ Import React ------
import React from "react";
import { useState, useEffect } from "react";
// ------ Import from antd ------
import { FloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
// ------ Import CSS ------
import "../CSS/BucketPage.css";
import Header from "../Components/Header";
// ------ React Router Dom ------
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BucketPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  // ------ useEffect ------
  useEffect(() => {
    axios;
  });

  return (
    <div className="app-container">
      <Header />
      <p>รายการอาหารในตะกร้าของฉัน</p>
      <div className="bucket-box1">
        <div className="orderlist">
          <div className="order-count">x1</div>
          <div className="order-name">สเต็กเนื้อริบอาย</div>
          <div className="order-price">฿ 189.00</div>
        </div>
      </div>
    </div>
  );
};

export default BucketPage;

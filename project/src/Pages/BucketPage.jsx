// ------ Import React ------
import React from "react";
import { useState, useEffect } from "react";
// ------ Import from antd ------
import { FloatButton } from "antd";
// ------ Import CSS ------
import "../Components/Header";
// ------ React Router Dom ------
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BucketPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const navigate = useNavigate();
  // ------ useEffect ------
  useEffect(() => {
    axios;
  });

  return (
    <div className="app-container">
      <Header />
    </div>
  );
};

export default BucketPage;

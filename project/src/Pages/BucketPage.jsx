// ------ Import React ------
import React from "react";
import { useState, useEffect } from "react";
// ------ Import from antd ------
import { FloatButton } from "antd";
// ------ Import CSS ------
import "../Components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";

const BucketPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Header />
    </div>
  );
};

export default BucketPage;

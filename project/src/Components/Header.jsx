import React from "react";
import { useState, useEffect } from "react";
// CSS
import "../CSS/Header.css";
// Axios
import axios from "axios";
// Router DOM
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
// ------ Import from antd ------
import { ArrowLeftOutlined } from "@ant-design/icons";

const Header = () => {
  const [table, setTable] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const location = useLocation(); // For check current route
  const navigate = useNavigate(); // For navigate

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        setTable(result.data.response);
      });
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((result) => {
        setCategory(result.data.response);
      });
  }, []);
  return (
    <>
      <div className="header">
        <h2 className="sarabun-semibold">Paradise Steak House</h2>
        <div className="btn">
          <button className="btn-thai">THA</button>
          <button className="btn-eng">ENG</button>
        </div>
      </div>
      <div className="header-table">
        {location.pathname !== "/bucket" && category && category.length > 0 && (
          <div>หมวดหมู่ : {category[0].category_name.thai}</div>
        )}
        {location.pathname == "/bucket" && category && category.length > 0 && (
          <ArrowLeftOutlined
            className="return-button"
            onClick={() => {
              navigate("/order"); // Mockup
            }}
          />
        )}
        <h3 className="sarabun-semibold">
          โต๊ะที่ : {table && table.table_number}
        </h3>
      </div>
    </>
  );
};

export default Header;

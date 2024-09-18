import React from "react";
import { useState, useEffect } from "react";
// CSS
import "../CSS/Header.css";
// Axios
import axios from "axios";
// Router DOM
import { useSearchParams } from "react-router-dom";

const Header = () => {
  const [table, setTable] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        setTable(result.data.response);
      });
    axios.get(`${import.meta.env.VITE_API_URL}/category/get`).then((result) => {
      setCategory(result.data.response);
    });
  }, []);
  return (
    <>
      <div className="header">
        <h2>Paradise Steak House</h2>
        <div className="btn">
          <button className="btn-thai">ไทย</button>
          <button className="btn-eng">ENG</button>
        </div>
      </div>
      <div className="header-table">
        {category && category.length > 0 && (
          <div>หมวดหมู่ : {category[0].category_name.thai}</div>
        )}
        <h3>โต๊ะที่ : {table.table_number}</h3>
      </div>
    </>
  );
};

export default Header;

// ------ React Router Dom ------
import { useSearchParams } from "react-router-dom";
// ------ CSS ------
import "../CSS/HeaderComponent.css";
// Axios
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Functions
import { setDefaultLanguage } from "../functions/language";

const HeaderComponent = () => {
  const [selectLanguage, setSelectLanguage] = useState("th");
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [table, setTable] = useState([]);
  const fetchAPI = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        if (result.data.response) {
          setTable(result.data.response);
        } else {
          window.location.replace("/error");
        }
      });
  };
  useEffect(() => {
    fetchAPI();
    setSelectLanguage(setDefaultLanguage(language));
  }, []);
  const changeLangauge = (params) => {
    window.location.replace(`/order?id=${id}&language=${params}`);
  };

  return (
    <div className="header-container">
      <div className="restautant-name-container">
        <h2 className="sarabun-bold">Paradise Steak House !</h2>
        <div>
          <button className="btn btn-thai" onClick={() => changeLangauge("th")}>
            THA
          </button>
          <button className="btn btn-eng" onClick={() => changeLangauge("eng")}>
            ENG
          </button>
        </div>
      </div>
      <div className="restautant-info-container sarabun-semibold">
        {selectLanguage === "th" ? (
          <>
            <span>หมวดหมู่อาหาร</span>
            <span>โต๊ะที่ : {table && table.table_number}</span>
          </>
        ) : (
          <>
            <span>Categories</span>
            <span>Table : {table && table.table_number}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

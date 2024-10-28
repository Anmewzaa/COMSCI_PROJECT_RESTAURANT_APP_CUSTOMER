// ------ React Router Dom ------
import { useSearchParams, useLocation } from "react-router-dom";
// ------ CSS ------
import "../CSS/HeaderComponent.css";
// Axios
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Functions
import { setDefaultLanguage } from "../functions/language";
// AntD
import { Skeleton } from "antd";

const HeaderComponent = () => {
  const [loading, setLoading] = useState(true);
  const [selectLanguage, setSelectLanguage] = useState("th");
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [table, setTable] = useState([]);
  const location = useLocation();

  const fetchAPI = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        if (result.data.response) {
          setTable(result.data.response);
        } else {
          window.location.replace("/error");
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAPI();
    setSelectLanguage(setDefaultLanguage(language));
  }, []);

  const changeLangauge = (params) => {
    window.location.replace(`/order?id=${id}&language=${params}`);
  };

  const renderHeaderContentTH = () => {
    if (location.pathname === "/order/cart") {
      return <span>รายการอาหารในตะกร้าของฉัน</span>;
    } else if (location.pathname === "/order") {
      return <span>หมวดหมู่อาหาร</span>;
    } else if (location.pathname.includes("/order/categories")) {
      return <span>รายการอาหาร</span>;
    }
  };
  const renderHeaderContentENG = () => {
    if (location.pathname === "/order/cart") {
      return <span>My Cart Items</span>;
    } else if (location.pathname === "/order") {
      return <span>Categories</span>;
    } else if (location.pathname.includes("/order/categories")) {
      return <span>Menu</span>;
    }
  };

  return (
    <div className="header-container">
      <div className="restautant-name-container">
        <h2 className="sarabun-bold">Paradise Steak House</h2>
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
            <span>{renderHeaderContentTH()}</span>
            {loading === true ? (
              <div
                style={{
                  height: "1.2em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton.Button active size={"default"} shape="square" />
              </div>
            ) : (
              <>
                <span>โต๊ะที่ : {table && table.table_number}</span>
              </>
            )}
          </>
        ) : (
          <>
            <span>{renderHeaderContentENG()}</span>
            {loading === true ? (
              <div
                style={{
                  height: "1.2em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton.Button active size={"default"} shape="square" />
              </div>
            ) : (
              <>
                <span>Table : {table && table.table_number}</span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

import React, { useEffect, useState } from "react";
import "../CSS/MenuPage.css";
import Header from "../Components/Header";
// Router DOM
import { useSearchParams } from "react-router-dom";
// Axois
import axios from "axios";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const categories = searchParam.get("categories");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/menu/getfromcate/${categories}`)
      .then((result) => {
        setMenu(result.data.response);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="menu-box-container">
        {/* ID : {id}
        <br />
        CATE : {categories} */}
        {menu &&
          menu.map((item) => {
            return (
              <>
                <div className="menu-box">
                  <img
                    className="img"
                    src={`${import.meta.env.VITE_API_URL}/images/${
                      item.menu_image
                    }`}
                    alt=""
                  />
                  <div className="menu-name">
                    {item.menu_name.thai}
                    <div className="menu-price">฿ {item.menu_price}</div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default MenuPage;

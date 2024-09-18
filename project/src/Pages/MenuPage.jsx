import React, { useEffect, useState } from "react";
import "../CSS/MenuPage.css";
import Header from "../Components/Header";
// Router DOM
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Axois
import axios from "axios";
// Ant Design
import { Button, Drawer } from "antd";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const categories = searchParam.get("categories");
  const navigte = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/menu/getfromcate/${categories}`)
      .then((result) => {
        setMenu(result.data.response);
      });
  }, []);
  return (
    <div className="menu-header">
      <Header />
      <div className="menu-box-container">
        {/* ID : {id}
        <br />
        CATE : {categories} */}
        {menu &&
          menu.map((item, index) => {
            return (
              <div key={index}>
                <div className="menu-box" onClick={showDrawer}>
                  <div className="img-box">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/images/${
                        item.menu_image
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="menu-name">
                    {item.menu_name.thai}
                    <div className="menu-price">฿ {item.menu_price}</div>
                  </div>
                </div>
                <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                  <p>{item.menu_name.thai}</p>
                </Drawer>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuPage;

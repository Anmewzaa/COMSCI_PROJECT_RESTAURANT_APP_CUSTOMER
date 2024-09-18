import { useEffect, useState } from "react";
import "../CSS/MenuPage.css";
import Header from "../Components/Header";
// Router DOM
import { useSearchParams } from "react-router-dom";
// Axois
import axios from "axios";
// Ant Design
import { Button, Drawer } from "antd";

const MenuPage = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const categories = searchParam.get("categories");
  const [menu, setMenu] = useState([]);

  // Drawer Code
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setCurrentItem(null);
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
                <div className="menu-box" onClick={() => showDrawer(item)}>
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
              </div>
            );
          })}
        <Drawer title="Basic Drawer" onClose={onClose} open={open} size="large">
          {currentItem && <>{currentItem.menu_name.thai}</>}
        </Drawer>
      </div>
    </div>
  );
};

export default MenuPage;

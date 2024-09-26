// React
import { useEffect, useState } from "react";
// CSS
import "../CSS/MenuPage.css";
// Router DOM
import { useSearchParams } from "react-router-dom";
// Axois
import axios from "axios";
// Ant Design
import { Button, Drawer, message, Radio } from "antd";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";

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

  const [value, setValue] = useState([]);
  const onChange = (optionId, selectedValue) => {
    setValue((prevValue) => {
      const updatedValues = prevValue.filter(
        (item) => item.option_id !== optionId
      );
      return [...updatedValues, { option_id: optionId, value: selectedValue }];
    });
  };
  const allOptionsSelected = () => {
    return menu.every((item) =>
      item.menu_option_id.every((option) =>
        value.some((v) => v.option_id === option.option_id)
      )
    );
  };
  const setMenuToLocalStorage = () => {
    if (!allOptionsSelected()) {
      message.error("กรุณาเลือกตัวเลือกทั้งหมดก่อนที่จะเพิ่มอาหารลงไปในตะกร้า");
      return;
    }
  };
  const oldData = localStorage.getItem("Cart");

  let dataToSave;
  if (oldData) {
    const oldDataArray = JSON.parse(oldData);
    if (Array.isArray(oldDataArray)) {
      dataToSave = [
        ...oldDataArray,
        {
          menu: menu,
          status: 1,
          option: value,
        },
      ];
    } else {
      dataToSave = [
        oldDataArray,
        {
          menu: menu,
          status: 1,
          option: value,
        },
      ];
    }
  } else {
    dataToSave = [
      {
        menu: menu,
        status: 1,
        option: value,
      },
    ];
    localStorage.setItem("Cart", JSON.stringify(dataToSave));
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/menu/getfromcate/${categories}`)
      .then((result) => {
        setMenu(result.data.response);
      });
  }, []);
  return (
    <div className="menu-header">
      <HeaderComponent />
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
        <Drawer
          title="Paradise Steak House"
          onClose={onClose}
          open={open}
          size="large"
          className="menu-popup"
        >
          {currentItem && (
            <>
              <div className="menu-detail-container">
                <div className="menu-detail">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${
                      currentItem.menu_image
                    }`}
                    alt=""
                  />
                  <h2 className="menu-detail-h2">
                    {currentItem.menu_name.thai}
                  </h2>
                  <p className="menu-describe">
                    {currentItem.menu_describe.thai}
                  </p>
                </div>
                <div className="menu-option">
                  {currentItem.menu_option_id &&
                    currentItem.menu_option_id.map((option, index) => {
                      return (
                        <div key={index} className="option-box">
                          <div className="option-inside-box">
                            <div className="option-name">
                              <h2>{option.option_name.thai}</h2>
                              <p>เลือก 1 รายการ</p>
                            </div>
                            <p className="must-have-option">ต้องการ</p>
                          </div>
                          <Radio.Group
                            checked
                            onChange={(e) =>
                              onChange(option.option_id, e.target.value)
                            }
                            value={
                              value.find(
                                (v) => v.option_id === option.option_id
                              )?.value || ""
                            }
                          >
                            {option.sub_option &&
                              option.sub_option.map((subOption, index) => {
                                return (
                                  <Radio
                                    key={index}
                                    value={subOption.sub_option_name.thai}
                                    className="sub-option"
                                  >
                                    {subOption.sub_option_name.thai}
                                  </Radio>
                                );
                              })}
                          </Radio.Group>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
          <br />
          {/* RESULT = {JSON.stringify(value)} */}
          <button
            type="primary"
            block
            onClick={() => {
              setMenuToLocalStorage();
            }}
            className="add-menu-button"
          >
            เพิ่มลงในตะกร้า
          </button>
        </Drawer>
      </div>
      <BackComponent />
    </div>
  );
};

export default MenuPage;

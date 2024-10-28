// React
import { useEffect, useState } from "react";
// CSS
import "../CSS/MenuPage.css";
// Router DOM
import { useSearchParams } from "react-router-dom";
// Axois
import axios from "axios";
// Ant Design
import { Spin, Button, Drawer, message, Radio, Empty } from "antd";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";
import CartComponent from "../Components/CartComponent";
// Functions
import { setDefaultLanguage } from "../functions/language";

const MenuPage = () => {
  const [searchParam] = useSearchParams();
  const language = searchParam.get("language");
  const categories = searchParam.get("categories");
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectLanguage, setSelectLanguage] = useState("th");

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
    setValue([]);
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

  const isAllOptionsSelectedForCurrentItem = () => {
    if (!currentItem) return false;

    return currentItem.menu_option_id.every((option) => {
      const isSelected = value.some((v) => v.option_id === option.option_id);

      if (option.sub_option.length === 1) {
        return true;
      }

      return isSelected;
    });
  };

  const getInitialCart = () => {
    const oldData = localStorage.getItem("Cart");
    if (!oldData) {
      return [];
    }
    return JSON.parse(oldData);
  };

  const setCart = () => {
    if (!isAllOptionsSelectedForCurrentItem()) {
      message.error("กรุณาเลือกตัวเลือกทั้งหมดก่อนที่จะเพิ่มอาหารลงไปในตะกร้า");
      return false;
    }

    const dataToSave = getInitialCart();

    if (currentItem) {
      dataToSave.push({
        menu: currentItem,
        status: 1,
        option: value,
      });
      localStorage.setItem("Cart", JSON.stringify(dataToSave));
      message.success("เพิ่มอาหารลงในตะกร้าเรียบร้อย");
      return true;
    }

    return false;
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/menu/getfromcate/${categories}`)
      .then((result) => {
        setMenu(result.data.response);
        setLoading(false);
      });
    setSelectLanguage(setDefaultLanguage(language));
  }, []);

  const isOptionSelected = (optionId) => {
    return value.some((v) => v.option_id === optionId && v.value !== "");
  };

  return (
    <div className="menu-header">
      <HeaderComponent />
      {loading ? (
        <div>
          <Spin fullscreen />
        </div>
      ) : (
        <>
          {menu && menu.length > 0 ? (
            <>
              <div className="menu-box-container">
                {menu &&
                  menu.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="menu-box"
                          onClick={() => showDrawer(item)}
                        >
                          <div className="img-box">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/images/${
                                item.menu_image
                              }`}
                              alt=""
                            />
                          </div>
                          <div className="text-content">
                            <div>
                              <div className="text-primary block">
                                {selectLanguage === "th" ? (
                                  <>{item.menu_name.thai}</>
                                ) : (
                                  <>{item.menu_name.english}</>
                                )}
                              </div>
                              <div className="text-sub block">
                                {selectLanguage === "th" ? (
                                  <>{item.menu_describe.thai}</>
                                ) : (
                                  <>{item.menu_describe.english}</>
                                )}
                              </div>
                            </div>
                            <div className="text-price">
                              {selectLanguage === "th" ? (
                                <>{item.menu_price} บาท</>
                              ) : (
                                <>{item.menu_price} THB</>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <Drawer
                  title={`${
                    selectLanguage === "th" ? "รายละเอียดเมนู" : "Menu Details"
                  }`}
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
                            alt="menu-image"
                          />
                          <div className="menu-detail-name">
                            {selectLanguage === "th" ? (
                              <>{currentItem.menu_name.thai}</>
                            ) : (
                              <>{currentItem.menu_name.english}</>
                            )}
                          </div>
                          <div className="menu-detail-describe">
                            {selectLanguage === "th" ? (
                              <>{currentItem.menu_describe.thai}</>
                            ) : (
                              <>{currentItem.menu_describe.english}</>
                            )}
                          </div>
                          <div className="menu-option-container">
                            {currentItem.menu_option_id &&
                              currentItem.menu_option_id.map(
                                (option, index) => {
                                  const hasSelected = isOptionSelected(
                                    option.option_id
                                  );

                                  return (
                                    <div
                                      key={index}
                                      className={`menu-option-box ${
                                        hasSelected ? "active" : ""
                                      }`}
                                    >
                                      <div className="option-content">
                                        <div>
                                          <p className="option-text">
                                            {option.option_name.thai}
                                          </p>
                                          <p className={`select-text`}>
                                            {hasSelected
                                              ? "เสร็จเรียบร้อย"
                                              : "เลือก 1 รายการ"}
                                          </p>
                                        </div>
                                        <div
                                          className={`flip-card ${
                                            hasSelected ? "flipped" : ""
                                          }`}
                                        >
                                          <div className="flip-card-inner">
                                            <div className="flip-card-back">
                                              เลือกแล้ว
                                            </div>
                                            <div className="flip-card-front">
                                              ต้องการ
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="radio-content">
                                        <Radio.Group
                                          checked
                                          onChange={(e) =>
                                            onChange(
                                              option.option_id,
                                              e.target.value
                                            )
                                          }
                                          value={
                                            value.find(
                                              (v) =>
                                                v.option_id === option.option_id
                                            )?.value || ""
                                          }
                                        >
                                          {option.sub_option &&
                                            option.sub_option.map(
                                              (subOption, index) => {
                                                return (
                                                  <Radio
                                                    key={index}
                                                    value={
                                                      subOption.sub_option_name
                                                        .thai
                                                    }
                                                    className="item"
                                                  >
                                                    {
                                                      subOption.sub_option_name
                                                        .thai
                                                    }
                                                  </Radio>
                                                );
                                              }
                                            )}
                                        </Radio.Group>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                          <Button
                            type="primary"
                            block
                            style={{
                              backgroundColor:
                                !isAllOptionsSelectedForCurrentItem()
                                  ? "#ccc"
                                  : "#ee8100",
                              borderColor: !isAllOptionsSelectedForCurrentItem()
                                ? "#ccc"
                                : "#ee8100",
                              color: "#fff",
                            }}
                            onClick={() => {
                              if (setCart()) {
                                onClose();
                              }
                            }}
                            disabled={!isAllOptionsSelectedForCurrentItem()}
                          >
                            เพิ่มลงในตะกร้า
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Drawer>
              </div>
            </>
          ) : (
            <div className="menu-empty">
              <Empty
                description={
                  <span>
                    {selectLanguage === "th" ? (
                      <>ไม่มีรายการอาหารที่จะแสดง</>
                    ) : (
                      <>Empty</>
                    )}
                  </span>
                }
              />
            </div>
          )}
        </>
      )}
      {loading ? (
        <></>
      ) : (
        <>
          <BackComponent />
          <CartComponent />
        </>
      )}
    </div>
  );
};

export default MenuPage;

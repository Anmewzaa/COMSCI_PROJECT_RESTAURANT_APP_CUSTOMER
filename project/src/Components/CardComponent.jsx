/* eslint-disable react/prop-types */
// Ant Design
import { Drawer, Radio, Button, message } from "antd";
// Component
import "../CSS/CardComponent.css";
// React
import { useState } from "react";

const CardComponent = ({ menu, language }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionChange = (optionId, selectedValue) => {
    setSelectedOptions((prev) => {
      const updatedOptions = prev.filter(
        (option) => option.option_id !== optionId
      );

      return [...updatedOptions, { option_id: optionId, value: selectedValue }];
    });
  };

  const addItemToCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || {
      table_order: [],
    };
    cartData.table_order.push({
      menu: menu,
      status: 1,
      option: selectedOptions,
    });
    localStorage.setItem("cart", JSON.stringify(cartData));

    setSelectedOptions([]);
    setOpen(false);
    message.success("เพิ่มเมนูลงในตะกร้าแล้ว!");
  };

  return (
    <>
      <div className="card-box" onClick={() => setOpen(true)}>
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
          alt="Food Image"
        />
        <div className="category-food-text">
          {language === "th" ? (
            <div className="prompt-medium">{menu?.menu_name.thai}</div>
          ) : (
            <div className="">{menu?.menu_name.english}</div>
          )}
        </div>
        <div>
          {language === "th" ? (
            <div className="prompt-light">{menu?.menu_price} บาท</div>
          ) : (
            <>{menu?.menu_price} Bath</>
          )}
        </div>
      </div>
      <Drawer
        title={
          <div className="prompt-regular">
            {language === "th" ? "รายละเอียดรายการอาหาร" : "food info"}
          </div>
        }
        onClose={() => {
          setOpen(false);
          setSelectedOptions([]);
        }}
        open={open}
        size={"large"}
        className="menu-drawer"
      >
        <>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
            alt="menu-image"
          />
          <div className="main-text">
            {language === "th" ? (
              <div className="prompt-bold">{menu.menu_name.thai}</div>
            ) : (
              <>{menu.menu_name.english}</>
            )}
          </div>
          <div className="sub-text">
            {language === "th" ? (
              <div className="prompt-regular">{menu.menu_describe.thai}</div>
            ) : (
              <>{menu.menu_describe.english}</>
            )}
          </div>
          <div className="menu-option-container">
            {menu.menu_option_id &&
              menu.menu_option_id.map((option, index) => {
                const isOptionSelected = selectedOptions.some(
                  (selected) => selected.option_id === option.option_id
                );

                return (
                  <div
                    key={index}
                    className={`menu-option-box ${
                      isOptionSelected ? "active" : ""
                    }`}
                  >
                    <div className="option-content">
                      <div>
                        <p className="option-text prompt-semibold">
                          {option.option_name.thai}
                        </p>
                        <p className={`select-text prompt-regular`}>
                          เสร็จเรียบร้อย
                        </p>
                      </div>
                      <div
                        className={`flip-card ${
                          isOptionSelected ? "flipped" : ""
                        }`}
                      >
                        <div className="flip-card-inner prompt-medium ">
                          <div className="flip-card-back prompt-semibold">
                            เลือกแล้ว
                          </div>
                          <div className="flip-card-front prompt-semibold">
                            ต้องการ
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="radio-content">
                      <Radio.Group
                        onChange={(e) =>
                          handleOptionChange(option.option_id, e.target.value)
                        }
                        value={
                          selectedOptions.find(
                            (o) => o.option_id === option.option_id
                          )?.value || ""
                        }
                      >
                        {option.sub_option &&
                          option.sub_option.map((subOption, subIndex) => {
                            return (
                              <Radio
                                key={subIndex}
                                value={subOption.sub_option_name.thai}
                                className="item"
                              >
                                {subOption.sub_option_name.thai}
                              </Radio>
                            );
                          })}
                      </Radio.Group>
                    </div>
                  </div>
                );
              })}
          </div>
          <Button block onClick={addItemToCart} className="prompt-bold">
            เพิ่มลงในตะกร้า
          </Button>
        </>
      </Drawer>
    </>
  );
};

export default CardComponent;

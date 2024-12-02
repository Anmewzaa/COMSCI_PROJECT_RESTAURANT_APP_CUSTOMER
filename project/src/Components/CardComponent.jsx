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

  const isAllOptionsSelected = menu.menu_option_id
    ? menu.menu_option_id.every((option) =>
        selectedOptions.some(
          (selected) => selected.option_id === option.option_id
        )
      )
    : true;

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
      <div
        className={`card-box`}
        onClick={() => menu.menu_status && setOpen(true)}
      >
        {!menu.menu_status && (
          <div className="inactive-menu">
            {language === "th" ? (
              <span className="prompt-medium">เมนูหมด</span>
            ) : (
              <span className="inter-medium">Sold out</span>
            )}
          </div>
        )}
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
          alt="Food Image"
        />
        <div className="category-food-text">
          {language === "th" ? (
            <div className="prompt-medium">{menu?.menu_name.thai}</div>
          ) : (
            <div className="inter-medium">{menu?.menu_name.english}</div>
          )}
        </div>
        <div>
          {language === "th" ? (
            <div className="prompt-light">{menu?.menu_price} บาท</div>
          ) : (
            <div className="inter-light">{menu?.menu_price} Bath</div>
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
          <div>
            <div className="main-text">
              {language === "th" ? (
                <div>
                  <h2 className="prompt-semibold">{menu.menu_name.thai}</h2>
                </div>
              ) : (
                <div>
                  <h2 className="inter-semibold">{menu.menu_name.english}</h2>
                </div>
              )}
            </div>
            <div className="price-text">
              {language === "th" ? (
                <>
                  <h4 className="prompt-semibold">ราคา</h4>
                  <span className="inter-regular">{menu.menu_price} บาท</span>
                </>
              ) : (
                <>
                  <h4 className="prompt-bold">price</h4>
                  <span className="inter-regular">{menu.menu_price} Bath</span>
                </>
              )}
            </div>
          </div>
          <div className="sub-text">
            {language === "th" ? (
              <div>
                <span className="prompt-regular">
                  {menu.menu_describe.thai}
                </span>
              </div>
            ) : (
              <div>
                <span className="inter-regular">
                  {menu.menu_describe.english}
                </span>
              </div>
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
                        {language === "th" ? (
                          <p className="option-text prompt-semibold">
                            {option.option_name.thai}
                          </p>
                        ) : (
                          <p className="option-text inter-semibold">
                            {option.option_name.english}
                          </p>
                        )}
                        {language === "th" ? (
                          <p className={`select-text prompt-medium`}>
                            {isOptionSelected
                              ? "เสร็จเรียบร้อย"
                              : "เลือก 1 รายการ"}
                          </p>
                        ) : (
                          <p className={`select-text inter-medium`}>
                            {isOptionSelected ? "completed" : "select 1"}
                          </p>
                        )}
                      </div>
                      <div
                        className={`flip-card ${
                          isOptionSelected ? "flipped" : ""
                        }`}
                      >
                        <div className="flip-card-inner prompt-medium ">
                          {language === "th" ? (
                            <div className="flip-card-back prompt-semibold">
                              เลือกแล้ว
                            </div>
                          ) : (
                            <div className="flip-card-back prompt-semibold">
                              selected
                            </div>
                          )}
                          {language === "th" ? (
                            <div className="flip-card-front prompt-semibold">
                              ต้องการ
                            </div>
                          ) : (
                            <div className="flip-card-front inter-semibold">
                              required
                            </div>
                          )}
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
                                {language === "th" ? (
                                  <p className="option-text prompt-semibold">
                                    {subOption.sub_option_name.thai}
                                  </p>
                                ) : (
                                  <p className="option-text inter-semibold">
                                    {subOption.sub_option_name.english}
                                  </p>
                                )}
                              </Radio>
                            );
                          })}
                      </Radio.Group>
                    </div>
                  </div>
                );
              })}
          </div>

          {language === "th" ? (
            <Button
              block
              onClick={addItemToCart}
              disabled={!isAllOptionsSelected}
              className="prompt-bold"
              size="large"
            >
              เพิ่มลงในตะกร้า
            </Button>
          ) : (
            <Button
              block
              onClick={addItemToCart}
              disabled={!isAllOptionsSelected}
              className="inter-bold"
              size="large"
            >
              Add to cart
            </Button>
          )}
        </>
      </Drawer>
    </>
  );
};

export default CardComponent;

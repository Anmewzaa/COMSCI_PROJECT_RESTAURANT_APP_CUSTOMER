// ------ Import React ------
import { useState, useEffect } from "react";
// ------ Import CSS ------
import "../CSS/CartPage.css";
// ------ React Router Dom ------
import { useSearchParams, useNavigate } from "react-router-dom";
// ------ Axios ------
import axios from "axios";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";
// Functions
import { setDefaultLanguage } from "../functions/language";
// AntD
import { Empty, Spin, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [selectLanguage, setSelectLanguage] = useState("th");
  const navigate = useNavigate();

  const getItemfromLocalstorage = () => {
    const item = localStorage.getItem("Cart");
    if (item) {
      const cartItems = JSON.parse(item);
      setMenu(cartItems);
      calculateTotalPrice(cartItems);
      return;
    }
    return [];
  };
  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.menu.menu_price) || 0;
      return acc + price;
    }, 0);
    setTotalPrice(total);
  };
  const fetchHistoryOrder = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        setHistoryOrder(result.data.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getItemfromLocalstorage();
    fetchHistoryOrder();
    setSelectLanguage(setDefaultLanguage(language));
  }, []);

  return (
    <>
      <HeaderComponent />
      {loading ? (
        <div>
          <Spin fullscreen />
        </div>
      ) : (
        <>
          <div className="app-container">
            <div className="cart-container">
              <>
                {menu && menu.length > 0 ? (
                  <>
                    <div className="bucket-box1">
                      <>
                        {menu &&
                          menu.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="orderlist">
                                  <div className="order-count">x1</div>
                                  <div className="order-details">
                                    <div className="order-name">
                                      {selectLanguage == "th" ? (
                                        <>{item.menu.menu_name.thai}</>
                                      ) : (
                                        <>{item.menu.menu_name.eng}</>
                                      )}
                                    </div>
                                    <div className="order-sub">
                                      {item &&
                                        item.option &&
                                        item.option.map((item) => {
                                          return (
                                            <div key={item.option_id}>
                                              {item.value}
                                            </div>
                                          );
                                        })}
                                    </div>
                                  </div>
                                  <div className="order-price">
                                    {selectLanguage == "th" ? (
                                      <>{item.menu.menu_price} บาท</>
                                    ) : (
                                      <>{item.menu.menu_price} THB</>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        <div className="order-total">
                          <div className="total-label">
                            {selectLanguage == "th" ? (
                              <>รวมราคาทั้งหมด</>
                            ) : (
                              <>Total price</>
                            )}
                          </div>
                          <div className="total-price">
                            {selectLanguage == "th" ? (
                              <>{totalPrice} บาท</>
                            ) : (
                              <>{totalPrice} THB</>
                            )}
                          </div>
                        </div>
                        <div className="button-container">
                          {selectLanguage == "th" ? (
                            <>
                              <button className="button-add-more">
                                สั่งอาหารเพิ่ม
                              </button>
                              <button className="button-order">
                                ส่งรายการอาหาร
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="button-add-more">
                                Order More Food
                              </button>
                              <button className="button-order">
                                Submit Food Order
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    </div>
                  </>
                ) : (
                  <div className="cart-empty">
                    <Empty
                      // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      // imageStyle={{ height: 60 }}
                      description={
                        <span>
                          {selectLanguage === "th" ? (
                            <>ไม่มีรายการอาหารในตะกร้า</>
                          ) : (
                            <>Empty</>
                          )}
                        </span>
                      }
                    >
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#ee8100",
                          borderColor: "#ee8100",
                          color: "#fff",
                        }}
                        onClick={() => {
                          navigate(
                            `/order?id=${id}&language=${selectLanguage}`
                          );
                        }}
                      >
                        สั่งอาหารเพิ่ม
                      </Button>
                    </Empty>
                  </div>
                )}
              </>
              <>
                <div className="history-food-container">
                  <p>รายการอาหารที่สั่งไปแล้ว</p>
                  <div className="btn" onClick={() => fetchHistoryOrder()}>
                    <SyncOutlined />
                  </div>
                </div>
                <div className="bucket-box2">
                  {historyOrder &&
                  historyOrder.table_order &&
                  historyOrder.table_order.length > 0 ? (
                    <>
                      {historyOrder.table_order.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="orderlist">
                              <div className="order-count">x1</div>
                              <div className="order-details">
                                <div className="order-name">
                                  {item.menu.menu_name.thai}
                                </div>
                                <div className="order-status">
                                  สถานะ: กำลังปรุง
                                </div>
                              </div>
                              <div className="order-price">
                                {item.menu.menu_price} บาท
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="order-total">
                        <div className="total-label">รวมราคาทั้งหมด</div>
                        <div className="total-price">฿ 397.00</div>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </>
            </div>
            <BackComponent />
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;

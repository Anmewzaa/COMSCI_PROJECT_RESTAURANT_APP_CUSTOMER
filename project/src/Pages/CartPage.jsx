// Axios
import axios from "axios";
// Andt
import { Button, Divider, Tag, Spin } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// CSS
import "../CSS/CartPage.css";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";
// React
import { useState, useEffect } from "react";
// React Router Dom
import { useSearchParams, useNavigate } from "react-router-dom";

const CartPage = () => {
  // REACT ROUTER DOM
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  // VARIABLE
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [current, setCurrent] = useState([]);
  const [history, setHistory] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  // FETCH API
  const fetchData = () => {
    try {
      const data = localStorage.getItem("cart");
      if (data.length > 0) {
        setCurrent(JSON.parse(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHistory = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
        .then((data) => {
          if (data?.data?.response) {
            setHistory(data.data.response);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTable = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
        .then((data) => {
          if (data?.data?.response) {
            setTable(data.data.response);
            setLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  // USE EFFECT
  useEffect(() => {
    fetchData();
    fetchHistory();
    fetchTable();
  }, []);

  const calculateTotal = (data) => {
    if (!data?.table_order) return 0;

    return data.table_order.reduce((total, item) => {
      const price = parseFloat(item?.menu?.menu_price) || 0;
      return total + price;
    }, 0);
  };

  const currentTotal = calculateTotal(current);
  const historyTotal = calculateTotal(history);

  const isCurrentEmpty = current.length === 0;
  const isHistoryEmpty = !Array.isArray(history) && history.length === 0;

  const sendOrder = () => {
    try {
      const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");

      const table_order = current?.table_order?.map((item) => ({
        menu: item.menu._id,
        status: item.status || 1,
        option: item.option.map((opt) => opt.value),
      }));

      const payload = {
        table_order,
      };

      axios
        .put(`${import.meta.env.VITE_API_URL}/table/add/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then(() => {
          localStorage.removeItem("cart");
          localStorage.clear();
          navigate(`/order?id=${id}&language=${language}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = (indexToRemove) => {
    const updatedOrders = current.table_order.filter(
      (item, index) => index !== indexToRemove
    );

    const updatedCurrent = { ...current, table_order: updatedOrders };
    setCurrent(updatedCurrent);

    if (updatedOrders.length === 0) {
      localStorage.removeItem("cart");
      window.location.reload();
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCurrent));
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Spin fullscreen />
        </>
      ) : (
        <>
          <HeaderComponent table={table} language={language} />
          <div className="cart-container">
            {isCurrentEmpty && isHistoryEmpty ? (
              <div className="cart-box-empty">
                <h4 className="prompt-medium">ยังไม่มีรายการที่สั่ง</h4>
                <div className="cart-box-empty-text prompt-regular">
                  <p>หากสั่งอาหารแล้ว</p>
                  <p>คุณสามารถติดตามสถานะรายการอาหารได้ที่หน้านี้</p>
                </div>
                <Button
                  onClick={() => {
                    navigate(`/order?id=${id}&language=${language}`);
                  }}
                  className="prompt-medium"
                >
                  สั่งอาหาร
                </Button>
              </div>
            ) : (
              <div className="cart-box">
                {isCurrentEmpty ? (
                  <>
                    <div className="more-food-container">
                      <h4 className="prompt-medium">ยังไม่มีรายการในตระกร้า</h4>
                      <Button className="prompt-medium">สั่งอาหารเพิ่ม</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <>
                      {language === "th" ? (
                        <>
                          <h2 className="prompt-medium">อาหารในตะกร้า</h2>
                        </>
                      ) : (
                        <>
                          <h2 className="inter-medium">Cart</h2>
                        </>
                      )}
                    </>
                    <div className="order-container">
                      {current?.table_order?.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="order-box">
                              <div className="order-box-text">
                                {language === "th" ? (
                                  <>
                                    <h4 className="prompt-medium">
                                      {item?.menu.menu_name.thai}
                                    </h4>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="inter-medium">
                                      {item?.menu.menu_name.english}
                                    </h4>
                                  </>
                                )}
                                <p className="option prompt-regular">
                                  {item.option.map((item, index) => {
                                    return <div key={index}>{item.value}</div>;
                                  })}
                                </p>
                              </div>
                              <div className="order-box-btn">
                                {language === "th" ? (
                                  <>
                                    <p className="prompt-regular">
                                      {item?.menu.menu_price} บาท
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="inter-regular">
                                      {item?.menu.menu_price} Bath
                                    </p>
                                  </>
                                )}
                                <div
                                  className="btn-delete"
                                  onClick={() => deleteOrder(index)}
                                >
                                  <DeleteOutlined />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Divider />
                      <div>
                        <Button
                          type="link"
                          className="addmorefood "
                          onClick={() => {
                            navigate(`/order?id=${id}&language=${language}`);
                          }}
                        >
                          <PlusOutlined />
                          {language === "th" ? (
                            <div className="prompt-medium">
                              เลือกรายการอาหารเพิ่ม
                            </div>
                          ) : (
                            <div className="inter-medium">Add more food</div>
                          )}
                        </Button>
                      </div>
                      <div>
                        <Button
                          block
                          size="large"
                          onClick={sendOrder}
                          className="prompt-medium"
                        >
                          {language === "th" ? (
                            <div className="prompt-medium">
                              ส่งรายการอาหาร {currentTotal} บาท
                            </div>
                          ) : (
                            <div className="inter-medium">
                              Send {currentTotal} Bath
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {/* {isHistoryEmpty ? (
                  <></>
                ) : (
                  <>
                    <>
                      {language === "th" ? (
                        <>
                          <h2 className="prompt-medium">อาหารที่สั่งไปแล้ว</h2>
                        </>
                      ) : (
                        <>
                          <h2 className="inter-medium">History</h2>
                        </>
                      )}
                    </>
                    <div className="order-container">
                      {history?.table_order?.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="order-box">
                              <div className="order-box-text">
                                {language === "th" ? (
                                  <>
                                    <h4 className="prompt-medium">
                                      {item?.menu.menu_name.thai}
                                    </h4>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="inter-medium">
                                      {item?.menu.menu_name.english}
                                    </h4>
                                  </>
                                )}
                                <p className="option prompt-regular">
                                  {item?.option.map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                  })}
                                </p>
                              </div>
                              <div>
                                {language === "th" ? (
                                  <>
                                    <p className="prompt-regular">
                                      {item?.menu.menu_price} บาท
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="inter-regular">
                                      {item?.menu.menu_price} Bath
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                            <Divider />
                          </div>
                        );
                      })}
                      <div className="price-summary">
                        {language === "th" ? (
                          <>
                            <h4 className="prompt-bold">รวมราคาทั้งหมด</h4>
                            <p className="prompt-regular">{historyTotal} บาท</p>
                          </>
                        ) : (
                          <>
                            <h4 className="inter-bold">Total price</h4>
                            <p className="inter-regular">{historyTotal} Bath</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="freespace"></div>
                  </>
                )} */}
              </div>
            )}
          </div>
          <BackComponent id={id} language={language} />
        </>
      )}
    </>
  );
};

export default CartPage;

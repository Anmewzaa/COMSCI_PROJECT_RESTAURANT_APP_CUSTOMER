// Axios
import axios from "axios";
// Andt
import { Button, Divider, Tag } from "antd";
// CSS
import "../CSS/CartPage.css";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";
// React
import { useState, useEffect } from "react";
// React Router Dom
import { useSearchParams } from "react-router-dom";

const CartPage = () => {
  // REACT ROUTER DOM
  const [searchParam] = useSearchParams();
  // VARIABLE
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [current, setCurrent] = useState([]);
  const [history, setHistory] = useState([]);
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
  // USE EFFECT
  useEffect(() => {
    fetchData();
    fetchHistory();
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
  const isHistoryEmpty = !Array.isArray(history) || history.length === 0;

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
          console.log("success");
          localStorage.removeItem("cart");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeaderComponent table={history} language={language} />
      <div className="cart-container">
        {isCurrentEmpty && isHistoryEmpty ? (
          <div className="cart-box-empty">
            <h4>ยังไม่มีรายการที่สั่ง</h4>
            <div className="cart-box-empty-text">
              <p>หากสั่งอาหารแล้ว</p>
              <p>คุณสามารถติดตามสถานะรายการอาหารได้ที่หน้านี้</p>
            </div>
            <Button>สั่งอาหาร</Button>
          </div>
        ) : (
          <div className="cart-box">
            {isCurrentEmpty ? (
              <>
                <div className="more-food-container">
                  <h4>ยังไม่มีรายการในตระกร้า</h4>
                  <Button>สั่งอาหารเพิ่ม</Button>
                </div>
              </>
            ) : (
              <>
                <h2>อาหารในตระกร้า</h2>
                <div className="order-container">
                  {current?.table_order?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="order-box">
                          <div className="order-box-text">
                            <h4>{item?.menu.menu_name.thai}</h4>
                            <p className="option">
                              {item.option.map((item, index) => {
                                return <Tag key={index}>{item.value}</Tag>;
                              })}
                            </p>
                          </div>
                          <div>
                            <p>{item?.menu.menu_price} บาท</p>
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
                  })}
                  <div className="price-summary">
                    <h4>รวมราคาทั้งหมด</h4>
                    <p>{currentTotal} บาท</p>
                  </div>
                  <div>
                    {/* <Button block size="large">
                      สั่งอาหารเพิ่ม
                    </Button> */}
                    <Button block size="large" onClick={sendOrder}>
                      ส่งรายการอาหาร
                    </Button>
                  </div>
                </div>
              </>
            )}
            {isHistoryEmpty ? (
              <></>
            ) : (
              <>
                <h2>อาหารที่สั่งไปแล้ว</h2>
                <div className="order-container">
                  {history?.table_order?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="order-box">
                          <div className="order-box-text">
                            <h4>{item?.menu?.menu_name.thai}</h4>
                            <p className="option">
                              {item?.option.map((item, index) => {
                                return <Tag key={index}>{item}</Tag>;
                              })}
                            </p>
                          </div>
                          <div>
                            <p>{item?.menu?.menu_price} บาท</p>
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
                  })}
                  <div className="price-summary">
                    <h4>รวมราคาทั้งหมด</h4>
                    <p>{historyTotal} บาท</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <BackComponent id={id} language={language} />
    </>
  );
};

export default CartPage;

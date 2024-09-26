// ------ Import React ------
import { useState, useEffect } from "react";
// ------ Import CSS ------
import "../CSS/CartPage.css";
// ------ React Router Dom ------
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// ------ Import Components ------
import "../Components/BackComponent";
// ------ Axios ------
import axios from "axios";
// Components
import HeaderComponent from "../Components/HeaderComponent";
import BackComponent from "../Components/BackComponent";

const CartPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  // ------ useEffect ------
  useEffect(() => {
    // axios;
  });

  return (
    <div className="app-container">
      <BackComponent />
      <HeaderComponent />
      <div className="cart-container">
        <p>รายการอาหารในตะกร้าของฉัน</p>
        <div className="bucket-box1">
          <div className="orderlist">
            <div className="order-count">x1</div>
            <div className="order-details">
              <div className="order-name">สเต็กเนื้อริบอาย</div>
              <div className="order-sub">มีเดียมแรร์</div>
            </div>
            <div className="order-price">฿ 189.00</div>
          </div>
          <div className="order-total">
            <div className="total-label">รวมราคาทั้งหมด</div>
            <div className="total-price">฿ 189.00</div>
          </div>
          <div className="button-container">
            <button className="button-add-more">สั่งอาหารเพิ่ม</button>
            <button className="button-order">ส่งรายการอาหาร</button>
          </div>
        </div>
        <p>รายการอาหารที่สั่งไปแล้ว</p>
        <div className="bucket-box2">
          <div className="orderlist">
            <div className="order-count">x1</div>
            <div className="order-details">
              <div className="order-name">สเต็กปลาดอลลี่</div>
              <div className="order-status">สถานะ: กำลังปรุง</div>
            </div>
            <div className="order-price">฿ 129.00</div>
          </div>
          <div className="orderlist">
            <div className="order-count">x1</div>
            <div className="order-details">
              <div className="order-name">สลัดกุ้งทอด</div>
              <div className="order-status">สถานะ: เสร็จสิ้น</div>
            </div>
            <div className="order-price">฿ 139.00</div>
          </div>
          <div className="orderlist">
            <div className="order-count">x1</div>
            <div className="order-details">
              <div className="order-name">สามสหาย</div>
              <div className="order-status">สถานะ: เสร็จสิ้น</div>
            </div>
            <div className="order-price">฿ 129.00</div>
          </div>
          <div className="order-total">
            <div className="total-label">รวมราคาทั้งหมด</div>
            <div className="total-price">฿ 397.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

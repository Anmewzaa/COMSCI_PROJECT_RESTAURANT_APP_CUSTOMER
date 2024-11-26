/* eslint-disable react/prop-types */

// ------ Ant Design ------
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// ------ React Router Dom ------
import { useNavigate } from "react-router-dom";

const CartComponent = ({ id, language }) => {
  const navigate = useNavigate();
  return (
    <>
      <FloatButton
        icon={<ShoppingCartOutlined />}
        tooltip={language == "th" ? <>ตระกร้า</> : <>Cart</>}
        onClick={() => navigate(`/cart?id=${id}&language=${language}`)}
      />
    </>
  );
};

export default CartComponent;

/* eslint-disable react/prop-types */

// ------ Ant Design ------
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// ------ React Router Dom ------
import { useNavigate } from "react-router-dom";

const CartComponent = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <FloatButton
        icon={<ShoppingCartOutlined />}
        tooltip={data == "th" ? <>ตระกร้า</> : <>Cart</>}
        onClick={() =>
          navigate("/order/cart?id=5092de9c-3179-489e-aece-cf934e826f0f")
        }
      />
    </>
  );
};

export default CartComponent;

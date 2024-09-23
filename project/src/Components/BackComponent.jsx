/* eslint-disable react/prop-types */

// ------ Ant Design ------
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// ------ React Router Dom ------
import { useNavigate } from "react-router-dom";

const BackComponent = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <FloatButton
        icon={<ArrowLeftOutlined />}
        tooltip={data == "th" ? <>กลับ</> : <>Back</>}
        onClick={() =>
          navigate("/order?id=5092de9c-3179-489e-aece-cf934e826f0f")
        }
        style={{ left: 24 }}
      />
    </>
  );
};

export default BackComponent;

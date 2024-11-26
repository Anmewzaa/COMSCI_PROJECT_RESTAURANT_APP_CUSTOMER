/* eslint-disable react/prop-types */

// ------ Ant Design ------
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// ------ React Router Dom ------
import { useNavigate } from "react-router-dom";

const BackComponent = ({ id, language }) => {
  const navigate = useNavigate();
  return (
    <>
      <FloatButton
        icon={<ArrowLeftOutlined />}
        tooltip={language == "th" ? <>กลับ</> : <>Back</>}
        onClick={() => navigate(`/order?id=${id}&language=${language}`)}
        style={{ left: 24 }}
      />
    </>
  );
};

export default BackComponent;

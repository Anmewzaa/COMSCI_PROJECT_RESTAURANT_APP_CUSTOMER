/* eslint-disable react/prop-types */

// ------ Ant Design ------
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// ------ React Router Dom ------
import { useSearchParams, useNavigate } from "react-router-dom";

const BackComponent = ({ data }) => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const navigate = useNavigate();
  return (
    <>
      <FloatButton
        icon={<ArrowLeftOutlined />}
        tooltip={data == "th" ? <>กลับ</> : <>Back</>}
        onClick={() =>
          navigate(`/order?id=${id}&language=${data == "th" ? "eng" : "th"}`)
        }
        style={{ left: 24 }}
      />
    </>
  );
};

export default BackComponent;

/* eslint-disable react/prop-types */
// Ant Design
import { Anchor } from "antd";
// CSS
import "../CSS/AnchorComponent.css";

const AnchorComponent = ({ item, language }) => {
  {
    language === "th" ? <>เปิด QR CODE</> : <>Click QR CODE</>;
  }
  const anchorItems = item.map((category, index) => ({
    key: category.category_id,
    href: `#${category.category_id}`,
    title: (
      <span
        className={
          language === "th"
            ? "ant-anchor-link-title thai"
            : "ant-anchor-link-title english"
        }
      >
        {language === "th"
          ? category.category_name.thai
          : category.category_name.english}
      </span>
    ),
  }));

  return (
    <>
      <div className="anchor-box ">
        <Anchor direction="horizontal" items={anchorItems} />
      </div>
    </>
  );
};

export default AnchorComponent;

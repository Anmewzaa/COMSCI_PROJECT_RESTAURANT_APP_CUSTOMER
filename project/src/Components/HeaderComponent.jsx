/* eslint-disable react/prop-types */
// Ant Design
import { Button, Drawer, QRCode } from "antd";
// CSS
import "../CSS/HeaderComponent.css";
// Icon
import { DownOutlined } from "@ant-design/icons";
// React
import { useState } from "react";
// Icon
import logo from "../images/app-logo.png";

const HeaderComponent = ({ table, language }) => {
  const [tableInfo, setTableInfo] = useState(false);
  const [qrcodeInfo, setQrcodeInfo] = useState(false);

  const changeLanguage = (newLanguage) => {
    const url = new URL(window.location.href);
    url.searchParams.set("language", newLanguage);
    window.location.href = url.toString();
  };

  return (
    <>
      <div className="header-container">
        <Button onClick={() => setTableInfo(true)}>
          {language === "th" ? (
            <div className="prompt-medium">
              Paraise Steak House | โต๊ะที่ {table?.table_number}{" "}
              {<DownOutlined />}
            </div>
          ) : (
            <>
              Paraise Steak House | Table no. {table?.table_number}{" "}
              {<DownOutlined />}
            </>
          )}
        </Button>
        <div className="language-container">
          <Button
            className="prompt-medium"
            onClick={() => changeLanguage("th")}
          >
            TH
          </Button>
          <Button
            className="prompt-medium"
            onClick={() => changeLanguage("eng")}
          >
            ENG
          </Button>
        </div>
      </div>
      <Drawer
        title="Paradise Steak House"
        placement={"bottom"}
        width={500}
        onClose={() => {
          setTableInfo(false);
        }}
        open={tableInfo}
      >
        <>
          <Button
            onClick={() => {
              setQrcodeInfo(true);
            }}
          >
            {language === "th" ? <>เปิด QR CODE</> : <>Click QR CODE</>}
          </Button>
        </>
      </Drawer>
      <Drawer
        placement={"bottom"}
        height={500}
        closable={false}
        onClose={() => {
          setQrcodeInfo(false);
        }}
        open={qrcodeInfo}
      >
        <div className="qrcode-container">
          <h2>แชร์ QR ให้เพื่อน</h2>
          <p>เพียงให้เพื่อนสแกน QR Code</p>
          <p className="table-number">โต๊ะที่ 1</p>
          <div>
            <QRCode
              value={"www.google.com"}
              icon={logo}
              errorLevel={"H"}
              size={250}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderComponent;

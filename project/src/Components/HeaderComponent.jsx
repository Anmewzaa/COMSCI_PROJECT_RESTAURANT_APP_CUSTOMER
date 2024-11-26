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
            <div className="inter-medium">
              Paraise Steak House | Table no. {table?.table_number}{" "}
              {<DownOutlined />}
            </div>
          )}
        </Button>
        <div className="language-container">
          <Button className="inter-medium" onClick={() => changeLanguage("th")}>
            TH
          </Button>
          <Button
            className="inter-medium"
            onClick={() => changeLanguage("eng")}
          >
            ENG
          </Button>
        </div>
      </div>
      <Drawer
        title="ข้อมูลโต๊ะ"
        placement={"bottom"}
        width={500}
        onClose={() => {
          setTableInfo(false);
        }}
        open={tableInfo}
      >
        <>
          <div className="drawer-container">
            <div className="text-container">
              {language === "th" ? (
                <>
                  <h4 className="prompt-semibold">โต๊ะที่</h4>
                  <span className="prompt-regular">{table.table_number}</span>
                </>
              ) : (
                <>
                  <h4 className="inter-semibold">Table no.</h4>
                  <span className="inter-regular">{table.table_number}</span>
                </>
              )}
            </div>
            <div className="text-container">
              {language === "th" ? (
                <>
                  <h4 className="prompt-semibold">จำนวนที่นั่ง</h4>
                  <span className="prompt-regular">{table.table_seat}</span>
                </>
              ) : (
                <>
                  <h4 className="inter-semibold">Table seat</h4>
                  <span className="inter-regular">{table.table_seat}</span>
                </>
              )}
            </div>
            <div className="text-container">
              {language === "th" ? (
                <>
                  <h4 className="prompt-semibold">โซนที่นั่ง</h4>
                  <span className="prompt-regular">
                    {table?.table_zone?.[0]?.zone_name || ""}
                  </span>
                </>
              ) : (
                <>
                  <h4 className="inter-semibold">Zone</h4>
                  <span className="inter-regular">
                    {table?.table_zone?.[0]?.zone_name || ""}
                  </span>
                </>
              )}
            </div>
            <div className="text-container">
              {language === "th" ? (
                <>
                  <h4 className="prompt-semibold">พนักงานดูแลโต๊ะ</h4>
                  <span className="prompt-regular">
                    {table?.table_employee?.[0]?.user_fullname || ""}
                  </span>
                </>
              ) : (
                <>
                  <h4 className="inter-semibold">Waiter/Waitress</h4>
                  <span className="inter-regular">
                    {table?.table_employee?.[0]?.user_fullname || ""}
                  </span>
                </>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              setQrcodeInfo(true);
            }}
            size="large"
            block
          >
            {language === "th" ? (
              <div className="prompt-medium">เปิด QR CODE</div>
            ) : (
              <div className="inter-medium">Open QR CODE</div>
            )}
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
          {language === "th" ? (
            <>
              <h2 className="prompt-medium">แชร์ QR ให้เพื่อน</h2>
              <p className="prompt-regular">เพียงให้เพื่อนสแกน QR Code</p>
              <p className="table-number prompt-medium">โต๊ะที่ 1</p>
            </>
          ) : (
            <>
              <h2 className="inter-medium">Share QR with friend</h2>
              <p className="inter-regular">Just scan QR Code</p>
              <p className="table-number inter-medium">Table no. 1</p>
            </>
          )}

          <div>
            <QRCode
              value={window.location.href}
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

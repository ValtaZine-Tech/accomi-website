import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: "#dddddd",
            colorPrimary: "#fdb10e",
            hoverBorderColor: "#fdb10e",
            controlHeight: 40,
          },
          Select: {
            colorBorder: "#dddddd",
            colorPrimary: "#fdb10e",
            hoverBorderColor: "#fdb10e",
            borderRadius: 6,
            controlHeight: 40,
            fontSize: 16,
            paddingInline: 10,
            fontSizeIcon: 16,
          },
          Button: {
            hoverBorderColor: "transparent",
            defaultHoverBorderColor: "transparent",
            defaultHoverBg: "#f0a400",
            defaultHoverColor: "#ffffff",
            defaultActiveBorderColor: "transparent",
            defaultActiveColor: "#ffffff",
            defaultActiveBg: "#f0a400",
            fontSize: 18,
          },
          DatePicker: {
            colorPrimary: "#fdb10e",
            hoverBorderColor: "#fdb10e",
            borderRadius: 6,
            controlHeight: 40,
            fontSize: 15,
            paddingInline: 10,
            fontSizeIcon: 16,
          },
          Steps: {
            colorPrimary: "#fdb10e",
          },
          Carousel: {
            dotActiveColor: "#fdb10e",
            dotColor: "#ffffff",
            dotSize: "10px",
          },
          Form: {
            labelColor: "#666666",
          },
          Tabs: {
            colorPrimary: "#fdb10e",
            colorBgContainer: "#ffffff",
            colorTextHeading: "#333333",
            colorText: "#333333",
            fontSize: 16,
            itemHoverColor: "#fdb10e",
            titleFontSize: 16
          },
          InputNumber: {
            controlHeight: 40
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);

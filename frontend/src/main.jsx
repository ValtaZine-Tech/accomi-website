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
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);

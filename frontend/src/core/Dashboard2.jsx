import { ConfigProvider } from 'antd';
import Drawer2 from '../partials/Drawer2';
import Container from "./Container";
import { Outlet } from "react-router-dom";

const Dashboard2 = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            Input: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            InputNumber: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            DatePicker: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            Button: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              height: 40,
              width: '10rem',
              border: 'none',
              fontSize: '15px'
            },
            Checkbox: {
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
            }
            
          },
        }}
      >
        <Drawer2 />
        <Container>
          {/* Render nested routes here */}
          <Outlet />
        </Container>
      </ConfigProvider>
    </>
  );
};

export default Dashboard2;

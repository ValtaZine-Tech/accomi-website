import Drawer3 from '../partials/Drawer3';
import Container from "./Container";
import { Outlet } from "react-router-dom";

const Dashboard3 = () => {
  return (
    <>
      <Drawer3 />
      <Container>
        {/* Render nested routes here */}
        <Outlet />
      </Container>
    </>
  );
};

export default Dashboard3;

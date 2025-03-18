import Drawer from '../partials/Drawer';
import Container from "./Container";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Drawer />
      <Container>
        {/* Render nested routes here */}
        <Outlet />
      </Container>
    </>
  );
};

export default Dashboard;

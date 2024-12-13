
import Drawer from "../partials/drawer";
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

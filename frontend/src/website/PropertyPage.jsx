import Footer from "../partials/Footer";
import Navbar from "../partials/Navbar";
import "./styles.css";
import { Outlet } from "react-router-dom";

const PropertyPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PropertyPage;

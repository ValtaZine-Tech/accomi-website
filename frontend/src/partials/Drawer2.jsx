// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Avatar, Badge, Button, Divider, Modal, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { asset, drawer } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const Drawer2 = () => {
  const [activeItem, setActiveItem] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the active drawer item based on the current URL
    setActiveItem(location.pathname);
  }, [location]);

  const handleLogout = () => {
    UserSessionUtils.logout();
    navigate("/");
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const popoverContent = (
    <div style={{ minWidth: 300, maxWidth: 300 }}>
      <div className="popover-header">
        <Avatar
          style={{
            verticalAlign: "middle",
            backgroundColor: "#ffbf00",
            color: "#fff",
            fontSize: 30,
          }}
          size={60}
        >
          {UserSessionUtils.getUserDetails()?.fullName?.charAt(0) || "U"}
        </Avatar>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>
          {UserSessionUtils.getUserDetails()?.fullName || "User"}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#888888" }}>
          {UserSessionUtils.getUserDetails()?.primaryEmail || "Not Available"}
        </p>
      </div>

      <Divider style={{ marginTop: 20, marginBottom: 5 }}></Divider>

      <Link to="/profile">
        <Button type="default" className="popover-btn">
          <UserOutlined />
          View Profile
        </Button>
      </Link>

      <Divider style={{ marginTop: 5, marginBottom: 20 }}></Divider>
      <Button
        type="default"
        className="logout-btn"
        onClick={() => setModal2Open(true)}
      >
        Sign out
      </Button>

      <div className="popover-footer">
        <Link to="#">Privacy policy</Link>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: 50,
            background: "#888888",
          }}
        ></span>
        <Link to="#">Terms</Link>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: 50,
            background: "#888888",
          }}
        ></span>
        <Link to="#">Cookies</Link>
      </div>

      <Modal
        title="Logout"
        centered
        open={modal2Open}
        onOk={() => handleLogout()}
        onCancel={() => setModal2Open(false)}
      >
        <p>You are logging out of your account.</p>
      </Modal>
    </div>
  );
  const notificationContent = (
    <div style={{ minWidth: 300, maxWidth: 350 }}>
      <div className="notification-header">
        <h3>Notifications</h3>
      </div>
      <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
      <div className="notification-item">
        <Avatar
          style={{
            verticalAlign: "middle",
            backgroundColor: "#ffbf00",
            color: "#fff",
          }}
          size="medium"
        ></Avatar>
        <div>
          <p style={{ fontWeight: 600 }}>John Doe</p>
          <p style={{ fontSize: "12px", color: "#555555" }}>
            {truncateText("You have a new message from John Doe", 23)}
          </p>
          <p style={{ color: "#888888", fontSize: "13px" }}>
            <i
              className="fa-regular fa-clock"
              style={{ marginRight: "5px", fontSize: "11px" }}
            ></i>
            2 minutes ago
          </p>
        </div>
      </div>
      <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
    </div>
  );

  return (
    <>
      <div className="drawer-container">
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            height: 80,
          }}
        >
          <img
            src={asset.logo}
            alt=""
            style={{ objectFit: "contain", height: "100px", width: "80px" }}
          />
          <h2 style={{ color: "#ffffff", transform: "translateX(-22px)" }}>
            ccomi - Property
          </h2>
        </div>
        <div className="drawer-separator"></div>
        <div className="drawer-body">
          <Link to="">
            <div
              className={`drawer-item ${
                activeItem === "/properties-dashboard" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.overview}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Overview</p>
              </div>
            </div>
          </Link>
          <div>
            <Divider
              orientation="left"
              orientationMargin={0}
              style={{
                color: "#ffffff",
                borderColor: "#fdb10e",
                borderWidth: 3,
              }}
            >
              <p style={{ color: "#fdb10e", lineHeight: 0 }}>Properties</p>
            </Divider>
          </div>
          {/* Property Form Link */}
          <Link to="properties">
            <div
              className={`drawer-item ${
                activeItem === "/properties-dashboard/properties"
                  ? "active"
                  : ""
              }`}
            >
              <div>
                <img
                  src={drawer.property}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>My Properties</p>
              </div>
            </div>
          </Link>

          <div>
            <Divider
              orientation="left"
              orientationMargin={0}
              style={{
                color: "#ffffff",
                borderColor: "#fdb10e",
                borderWidth: 3,
              }}
            >
              <p style={{ color: "#fdb10e", lineHeight: 0 }}>WebPages</p>
            </Divider>
          </div>

          <Link to="/">
            <div className={`drawer-item`}>
              <div></div>
              <div>
                <p>Home</p>
              </div>
            </div>
          </Link>

          <Link to="/about">
            <div className={`drawer-item`}>
              <div></div>
              <div>
                <p>About Us</p>
              </div>
            </div>
          </Link>

          <Link to="/properties">
            <div className={`drawer-item`}>
              <div></div>
              <div>
                <p>Properties</p>
              </div>
            </div>
          </Link>

          <Link to="/landlord-agent">
            <div className={`drawer-item`}>
              <div></div>
              <div>
                <p>Agents</p>
              </div>
            </div>
          </Link>

          <div>
            <Divider
              orientation="left"
              orientationMargin={0}
              style={{
                color: "#ffffff",
                borderColor: "#fdb10e",
                borderWidth: 3,
              }}
            >
              <p style={{ color: "#fdb10e", lineHeight: 0 }}>Other</p>
            </Divider>
          </div>

          <Link to="reviews">
            <div
              className={`drawer-item ${
                activeItem === "/properties-dashboard/reviews" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.comments}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Reviews</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="topbar-container">
        <div className="topbar-container-right">
          <Popover
            content={notificationContent}
            trigger="click"
            style={{ zIndex: 1000, marginTop: 20 }}
          >
            <Badge count={5} size="small" style={{ marginRight: -2 }}>
              <i
                className="fa-regular fa-bell"
                style={{ color: "#8e8e8e", fontSize: 20, cursor: "pointer" }}
              ></i>
            </Badge>
          </Popover>

          <Popover content={popoverContent} trigger="click">
            <Avatar
              style={{
                verticalAlign: "middle",
                backgroundColor: "#ffbf00",
                color: "#fff",
                cursor: "pointer",
                fontSize: 20,
              }}
              size="large"
            >
              {UserSessionUtils.getUserDetails()?.fullName?.charAt(0) || "U"}
            </Avatar>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Drawer2;

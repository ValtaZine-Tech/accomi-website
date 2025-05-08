// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Avatar, Badge, Button, Divider, Modal, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { asset, drawer } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const Drawer = () => {
  const [activeItem, setActiveItem] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleLogout = () => {
    UserSessionUtils.logout();
    setIsAuthenticated(false);

    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const details = UserSessionUtils.getUserDetails();
      setUserDetails(details);
      console.log("User details:", details);
    } else {
      setUserDetails(null);
    }
  }, [isAuthenticated]);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const popoverContent = (
    <div style={{ minWidth: 250, maxWidth: 250 }}>
      <div className="popover-header">
        <Avatar
          style={{
            verticalAlign: "middle",
            backgroundColor: "#ffbf00",
            color: "#fff",
          }}
          size={60}
        >
          {UserSessionUtils.getUserDetails()?.fullName?.charAt(0) || "U"}
        </Avatar>
        <p style={{ margin: 0, fontWeight: 500 }}>
          {UserSessionUtils.getUserDetails()?.fullName || "User"}
        </p>
        <p style={{ margin: 0 }}>
          {UserSessionUtils.getUserDetails()?.email || "Not Available"}
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
  const featuresListContent = (
    <div style={{ minWidth: 300, maxWidth: 350 }}>
      <div className="notification-header">
        <h3 style={{ color: "#555555" }}>More Features</h3>
      </div>
      <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 5 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <img
            src={asset.flutter}
            style={{ height: 55, width: 55, cursor: "pointer" }}
            alt=""
          />
          <p style={{ color: "#666666", fontWeight: 600 }}>Flutterwave</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <img
            src={asset.quickBook}
            style={{ height: 55, width: "100%", cursor: "pointer" }}
            alt=""
          />
          <p style={{ color: "#666666", fontWeight: 600 }}>QuickBooks</p>
        </div>
      </div>

      <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
    </div>
  );
  const notificationContent = (
    <div style={{ minWidth: 300, maxWidth: 350 }}>
      <div className="notification-header">
        <h3 style={{ color: "#555555" }}>Notifications</h3>
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
          <p style={{ fontWeight: 600, color: "#555555" }}>John Doe</p>
          <p style={{ fontSize: "13px", color: "#666666" }}>
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
          <h2 style={{ color: "#ffffff" }}>Accomi - Admin</h2>
        </div>
        <div className="drawer-separator"></div>
        <div className="drawer-body">
          <Link to="/dashboard/">
            <div
              className={`drawer-item ${
                activeItem === "/dashboard/" ? "active" : ""
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
                activeItem === "/dashboard/properties" ? "active" : ""
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
                <p>Residencies</p>
              </div>
            </div>
          </Link>
          {/* <Link to="property-form">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/property-form' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>Property Form</p>
                            </div>
                        </div>
                    </Link> */}

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
              <p style={{ color: "#fdb10e", lineHeight: 0 }}>Profiles</p>
            </Divider>
          </div>
          {/* Employee Form Link */}
          <Link to="employee-list">
            <div
              className={`drawer-item ${
                activeItem === "/dashboard/employee-list" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.employee}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Employees</p>
              </div>
            </div>
          </Link>
          <Link to="students">
            <div
              className={`drawer-item ${
                activeItem === "/dashboard/students" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.student}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Students</p>
              </div>
            </div>
          </Link>

          <Link to="landlords">
            <div
              className={`drawer-item ${
                activeItem === "/dashboard/landlords" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.landlord}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Landlords</p>
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
              <p style={{ color: "#fdb10e", lineHeight: 0 }}>Institutions</p>
            </Divider>
          </div>
          {/* Employee Form Link */}
          <Link to="institutions">
            <div
              className={`drawer-item ${
                activeItem === "/dashboard/university-list" ? "active" : ""
              }`}
            >
              <div>
                <img
                  src={drawer.university}
                  style={{ width: 20, height: 20 }}
                  alt="drawer item icon"
                />
              </div>
              <div>
                <p>Universities</p>
              </div>
            </div>
          </Link>
          {/* <Link to="university-form">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/university-form' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>University Form</p>
                            </div>
                        </div>
                    </Link> */}

          <div>
            {/* <Divider orientation='left' orientationMargin={0} style={{ color: '#ffffff', borderColor: '#fdb10e', borderWidth: 3, }}>
                            <p style={{ color: '#fdb10e', lineHeight: 0 }}>Other</p>
                        </Divider> */}
          </div>
        </div>
      </div>

      <div className="topbar-container">
        <div className="topbar-container-right">
          <Popover
            content={featuresListContent}
            trigger="click"
            style={{ zIndex: 1000, marginTop: 20 }}
          >
            <img
              src={asset.grid}
              style={{ cursor: "pointer", height: 25, width: 25 }}
            />
          </Popover>
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
              }}
              size="large"
            >
              {UserSessionUtils.getUserDetails()?.fullName?.charAt(0) || "U"}
            </Avatar>
          </Popover>
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
    </>
  );
};

export default Drawer;

import { asset, drawer } from "../assets/assets";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Drawer, Modal, Popover } from "antd";
import LoginForm from "../auth/Login2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styles.css";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import { CustomModal } from "../components/CustomalModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // State to toggle clicked class

  const toggleMenu = () => {
    // setIsMenuVisible(!isMenuVisible);
    setIsClicked(!isClicked); // Toggle clicked state
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    setIsAuthenticated(UserSessionUtils.isAuthenticated());
  }, []);

  // Replace your current authentication useEffect with:
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(UserSessionUtils.isAuthenticated());
    };

    // Listen for both storage events and local authentication changes
    window.addEventListener("storage", handleStorageChange);

    // Add a custom event listener for local auth changes
    window.addEventListener("app-auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("app-auth-change", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isDrawerVisible) {
      const details = UserSessionUtils.getUserDetails();
      setUserDetails(details);
    }
  }, [isDrawerVisible]);

  const triggerAuthCheck = () => {
    setIsAuthenticated(UserSessionUtils.isAuthenticated());
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  const handleLogout = () => {
    UserSessionUtils.logout();
    triggerAuthCheck(() => {
      setIsAuthenticated(UserSessionUtils.logout());
    });
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const details = UserSessionUtils.getUserDetails();
      setUserDetails(details);
      // console.log("User details:", details);
    } else {
      setUserDetails(null);
    }
  }, [isAuthenticated]);

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

  return (
    <>
      <nav className="nav-container">
        <div className="nav-card">
          <div className="nav-logo">
            <LazyLoadImage
              src={asset.logo}
              alt="accomi logo"
              effect="blur"
              style={{ width: "80px", height: "80px" }}
            />
            <h2>ccomi</h2>
          </div>
          <div className={`nav-menu ${isClicked ? "clicked" : ""}`}>
            <ul className="menu-container">
              <Link to="/">
                <li className={activePath === "/" ? "active" : ""}>
                  Home {activePath === "/" && <div className="nav-dot"></div>}
                </li>
              </Link>
              <Link to="/about">
                <li className={activePath === "/about" ? "active" : ""}>
                  About Us{" "}
                  {activePath === "/about" && <div className="nav-dot"></div>}
                </li>
              </Link>
              <Link to="/properties">
                <li
                  className={
                    activePath.startsWith("/properties") ? "active" : ""
                  }
                >
                  Properties{" "}
                  {activePath.startsWith("/properties") && (
                    <div className="nav-dot"></div>
                  )}
                </li>
              </Link>
            </ul>
            <Link to="/landlord-agent">
              <Button className="nav-auth-btn5">Get Listed as Agent</Button>
            </Link>
          </div>
          <div className="nav-cta-btns">
            {isAuthenticated ? (
              <>
                {userDetails?.roles?.some(
                  (role) => role.type === "STUDENT"
                ) && (
                  <Link to="/wishlist">
                    <button
                      type="default"
                      className="nav-auth-btn2"
                      aria-label="My WishList"
                    >
                      <img src={asset.wishlist} alt="" />
                    </button>
                  </Link>
                )}
                <Link to="/landlord-agent">
                  <button className="nav-auth-btn3">List Your Property</button>
                </Link>

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
                    {UserSessionUtils.getUserDetails()?.fullName?.charAt(0) ||
                      "U"}
                  </Avatar>
                </Popover>
              </>
            ) : (
              <>
                <Link to="/landlord-agent">
                  <button className="nav-auth-btn3">List Your Property</button>
                </Link>
                <Button
                  type="default"
                  className="nav-auth-btn4"
                  onClick={showModal}
                >
                  Login
                </Button>
              </>
            )}

            <div
              className={`nav-menu-btn ${isClicked ? "clicked" : ""}`}
              onClick={toggleMenu}
            >
              <div className="m1"></div>
              <div className="m1"></div>
              <div className="m1"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login/Registration Modal */}
      <CustomModal visible={isModalVisible} onClose={handleCancel}>
        <LoginForm
          onSuccess={() => {
            handleCancel();
            triggerAuthCheck(); // Use the new trigger method
          }}
        />
      </CustomModal>

      {/* Profile Drawer */}
      <Drawer
        className="profile-drawer"
        placement="right"
        onClose={onClose}
        open={isDrawerVisible}
        width={350}
      >
        <div className="drawer-profile-header">
          <div className="dph1">
            <div className="profile-pic">
              <LazyLoadImage
                src={drawer.placeholder}
                alt="User profile"
                effect="blur"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="dph2">
            <div className="dph2-cards">
              <div>
                <p>Name:</p>
              </div>
              <div>
                <p>{userDetails?.fullName || ""}</p>
              </div>
            </div>
            <div className="dph2-cards">
              <div>
                <p>Email:</p>
              </div>
              <div>
                <p>{userDetails?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-separator">
          <div></div>
          <div></div>
        </div>
        <div className="drawer-profile-body">
          {/* Agent Dashboard */}
          {userDetails?.roles?.some((role) => role.type === "LANDLORD") && (
            <>
              <Link to="/property-dashboard">
                <div className="drawer-profile-btn">
                  <div></div>
                  My Dashboard
                </div>
              </Link>
            </>
          )}

          {/* Student Dashboard */}
          {userDetails?.roles?.some((role) => role.type === "STUDENT") && (
            <Link to="/student-dashboard">
              <div className="drawer-profile-btn">
                <div></div>
                My Dashboard
              </div>
            </Link>
          )}

          {/* Admin Dashboard */}
          {userDetails?.roles?.some((role) => role.type === "ADMIN") && (
            <Link to="/admin-dashboard">
              <div className="drawer-profile-btn">
                <div></div>
                My Dashboard
              </div>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;

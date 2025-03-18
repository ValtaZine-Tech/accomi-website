import { asset, drawer } from "../assets/assets";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import LoginForm from "../auth/Login2";
import SignUp from "../auth/SignUp"; // Import the SignUp component
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
    const [isLoginForm, setIsLoginForm] = useState(true); // Toggle between login and registration
    const [userDetails, setUserDetails] = useState(null);


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
        window.addEventListener('storage', handleStorageChange);

        // Add a custom event listener for local auth changes
        window.addEventListener('app-auth-change', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('app-auth-change', handleStorageChange);
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
        window.dispatchEvent(new Event('app-auth-change'));
    };

    const showModal = () => {
        setIsModalVisible(true);
        setIsLoginForm(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const handleLogout = () => {
        UserSessionUtils.logout();
        triggerAuthCheck(); // Use the same trigger method
        navigate('/');
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
                    <div className="nav-menu">
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
                            {userDetails?.roles?.some(role => role.type === "LANDLORD") && (
                                <Link to="/landlord-agent">
                                    <li className={activePath === "/landlord-agent" ? "active" : ""}>
                                        List Your Property
                                        {activePath === "/landlord-agent" && <div className="nav-dot"></div>}
                                    </li>
                                </Link>
                            )}
                            <Link to="/properties">
                                <li className={activePath === "/properties" ? "active" : ""}>
                                    Properties{" "}
                                    {activePath === "/properties" && <div className="nav-dot"></div>}
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="nav-cta-btns">
                        {isAuthenticated ? (
                            <>
                            {userDetails?.roles?.some(role => role.type === "STUDENT") && (
                                <Link to="/wishlist">
                                    <button type="default" className="nav-auth-btn2" aria-label="My WishList">
                                        <img src={asset.wishlist} alt="" />
                                    </button>
                                </Link>
                            )}
                                <button type="default" className="nav-auth-btn2" onClick={showDrawer} aria-label="My Profile">
                                    <img src={asset.profile} alt="" />
                                </button>
                                <button type="default" className="nav-auth-btn2" onClick={handleLogout} aria-label="Logout">
                                    <img src={asset.logout} alt="" />
                                </button>
                            </>
                        ) : (
                            <button type="default" className="nav-auth-btn3" onClick={showModal}>
                                <img src={asset.login} alt="" />
                                Log in
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Login/Registration Modal */}
            <CustomModal visible={isModalVisible} onClose={handleCancel}>
                {isLoginForm ? (
                    <LoginForm onSuccess={() => {
                        handleCancel();
                        triggerAuthCheck(); // Use the new trigger method
                    }} />
                ) : (
                    <SignUp />
                )}
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
                                <p>{userDetails?.email || "Loading..."}</p>
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
                    {userDetails?.roles?.some(role => role.type === "LANDLORD") && (
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
                    {userDetails?.roles?.some(role => role.type === "STUDENT") && (
                        <Link to="/student-dashboard">
                            <div className="drawer-profile-btn">
                                <div></div>
                                My Dashboard
                            </div>
                        </Link>
                    )}

                    {/* Admin Dashboard */}
                    {userDetails?.roles?.some(role => role.type === "ADMIN") && (
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
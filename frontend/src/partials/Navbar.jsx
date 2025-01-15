import { asset, drawer } from "../assets/assets"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from 'antd';
import LoginForm from '../auth/Login2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './styles.css'
import PropTypes from 'prop-types';


const CustomModal = ({ visible, onClose, children }) => {
    if (!visible) return null;
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <button className="custom-modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
};

CustomModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};


const Navbar = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    useEffect(() => {
        // Replace this with your actual authentication check logic
        const user = localStorage.getItem("user");
        setIsAuthenticated(!!user);
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        setIsModalVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

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
                                <li className={activePath === "/" ? "active" : ""}>Home {activePath === "/" && <div className="nav-dot"></div>}</li>
                            </Link>
                            <Link to="/about">
                                <li className={activePath === "/about" ? "active" : ""}>About Us {activePath === "/about" && <div className="nav-dot"></div>}</li>
                            </Link>
                            <Link to="/services">
                                <li className={activePath === "/services" ? "active" : ""}>Services {activePath === "/services" && <div className="nav-dot"></div>}</li>
                            </Link>
                            <Link to="/properties">
                                <li className={activePath === "/properties" ? "active" : ""}>Properties {activePath === "/properties" && <div className="nav-dot"></div>}</li>
                            </Link>
                            <Link to="/contact">
                                <li className={activePath === "/contact" ? "active" : ""}>Contact US {activePath === "/contact" && <div className="nav-dot"></div>}</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="nav-cta-btns">
                        {isAuthenticated ? (
                            <>
                                <Link to="/wishlist">
                                    <button type="default" className="nav-auth-btn2" aria-label="My WishList">
                                        <img src={asset.wishlist} alt="" />
                                    </button>
                                </Link>
                                <button type="default" className="nav-auth-btn2" onClick={showDrawer} aria-label="My Profile">
                                    <img src={asset.profile} alt=""  />
                                </button>
                                <button type="default" className="nav-auth-btn2" onClick={handleLogout} aria-label="Logout">
                                    <img src={asset.logout} alt=""  />
                                </button>
                            </>
                        ) : (
                            <button className="nav-auth-btn" onClick={showModal}>Sign in</button>
                        )}
                    </div>
                </div>
            </nav>

            <CustomModal visible={isModalVisible} onClose={handleCancel}>
                <LoginForm onLogin={handleLogin} />
            </CustomModal>

            <Drawer
                className="profile-drawer"
                title="Student Profile"
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
                                alt=""
                                effect="blur"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>
                    <div className="dph2">
                        <div className="dph2-cards">
                            <div><p>Name:</p></div>
                            <div><p>Odeke Noah</p></div>
                        </div>
                        <div className="dph2-cards">
                            <div><p>Email:</p></div>
                            <div><p>odekenoah@gmail.com</p></div>
                        </div>
                    </div>
                </div>
                <div className="profile-separator">
                    <div></div>
                    <div></div>
                </div>
                <div className="drawer-profile-body"></div>

            </Drawer>
        </>
    )
}


export default Navbar
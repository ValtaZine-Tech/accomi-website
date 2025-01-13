// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Avatar, Divider, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { asset, drawer } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Drawer = () => {
    const [activeItem, setActiveItem] = useState('');
    const [modal2Open, setModal2Open] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        // Set the active drawer item based on the current URL
        setActiveItem(location.pathname);
    }, [location]);

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <>
            <div className="drawer-container">
                <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', height: 80 }}>
                    <img
                        src={asset.logo}
                        alt=""
                        style={{ objectFit: 'contain', height: '100px', width: '80px' }}
                    />
                    <h2 style={{ color: '#ffffff' }}>Accomi - Admin</h2>
                </div>
                <div className="drawer-separator"></div>
                <div className="drawer-body">
                    <Link to="/dashboard/">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.overview} style={{ width: 20, height: 20 }} alt="drawer item icon" />
                            </div>
                            <div>
                                <p>Overview</p>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#ffffff', borderColor: '#fdb10e', borderWidth: 3, }}>
                            <p style={{ color: '#fdb10e', lineHeight: 0 }}>Properties</p>
                        </Divider>
                    </div>
                    {/* Property Form Link */}
                    <Link to="properties">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/properties' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.property} style={{ width: 20, height: 20 }} alt="drawer item icon" />
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
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#ffffff', borderColor: '#fdb10e', borderWidth: 3, }}>
                            <p style={{ color: '#fdb10e', lineHeight: 0 }}>Profiles</p>
                        </Divider>
                    </div>
                    {/* Employee Form Link */}
                    <Link to="employee-list">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/employee-list' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.employee} style={{ width: 20, height: 20 }} alt="drawer item icon" />
                            </div>
                            <div>
                                <p>Employees</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="students">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/students' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.student} style={{ width: 20, height: 20 }} alt="drawer item icon" />
                            </div>
                            <div>
                                <p>Students</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="landlords">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/landlords' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.landlord} style={{ width: 20, height: 20 }} alt="drawer item icon" />
                            </div>
                            <div>
                                <p>Landlords</p>
                            </div>
                        </div>
                    </Link>

                    <div>
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#ffffff', borderColor: '#fdb10e', borderWidth: 3, }}>
                            <p style={{ color: '#fdb10e', lineHeight: 0 }}>Institutions</p>
                        </Divider>
                    </div>
                    {/* Employee Form Link */}
                    <Link to="institutions">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/university-list' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.university} style={{ width: 20, height: 20 }} alt="drawer item icon" />
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
                <Avatar
                    style={{
                        verticalAlign: 'middle',
                    }}
                    size="large"
                >
                    <UserOutlined />

                </Avatar>
                <div className='logout-btn' onClick={() => setModal2Open(true)}>
                    <img src={asset.logout} style={{ width: 30, height: 30 }} alt="" />
                    <p>Logout</p>
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

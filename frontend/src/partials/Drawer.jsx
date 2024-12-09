// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { asset } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';

const Drawer = () => {
    const [activeItem, setActiveItem] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Set the active drawer item based on the current URL
        setActiveItem(location.pathname);
    }, [location]);

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
                    <div>
                        <Divider orientation='left' style={{ color: '#ffffff', borderColor: '#fdb10e',borderWidth:3, }}>
                            Property Section
                        </Divider>
                    </div>
                    {/* Property Form Link */}
                    <Link to="property-list">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/property-list' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>Property List</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="property-form">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/property-form' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>Property Form</p>
                            </div>
                        </div>
                    </Link>


                    <div>
                        <Divider orientation='left' style={{ color: '#ffffff', borderColor: '#fdb10e' }}>
                            Employee Section
                        </Divider>
                    </div>
                    {/* Employee Form Link */}
                    <Link to="employee-list">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/employee-list' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>Employee List</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="employee-form">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/employee-form' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>Employee Form</p>
                            </div>
                        </div>
                    </Link>

                    <div>
                        <Divider orientation='left' style={{ color: '#ffffff', borderColor: '#fdb10e' }}>
                            University Section
                        </Divider>
                    </div>
                    {/* Employee Form Link */}
                    <Link to="university-list">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/university-list' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>University List</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="university-form">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/university-form' ? 'active' : ''}`}
                        >
                            <div></div>
                            <div>
                                <p>University Form</p>
                            </div>
                        </div>
                    </Link>

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
            </div>
        </>
    );
};

export default Drawer;

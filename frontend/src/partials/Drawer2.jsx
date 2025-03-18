// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Avatar, Divider, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { asset, drawer } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Drawer2 = () => {
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
                    <h2 style={{ color: '#ffffff',transform:'translateX(-22px)' }}>ccomi - Property</h2>
                </div>
                <div className="drawer-separator"></div>
                <div className="drawer-body">
                    <Link to="">
                        <div
                            className={`drawer-item ${activeItem === '/property-dashboard/' ? 'active' : ''}`}
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
                                <p>My Properties</p>
                            </div>
                        </div>
                    </Link>
                    


                    <div>
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#ffffff', borderColor: '#fdb10e', borderWidth: 3, }}>
                            <p style={{ color: '#fdb10e', lineHeight: 0 }}>Other</p>
                        </Divider>
                    </div>

                    <Link to="properties">
                        <div
                            className={`drawer-item ${activeItem === '/dashboard/properties' ? 'active' : ''}`}
                        >
                            <div>
                                <img src={drawer.comments} style={{ width: 20, height: 20 }} alt="drawer item icon" />
                            </div>
                            <div>
                                <p>Comments</p>
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

export default Drawer2;

/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Col, ConfigProvider, Input, message, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, Loading3QuartersOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { asset } from '../assets/assets';
import { BaseApiService } from '../utils/BaseApiService';
import { UserSessionUtils } from '../utils/UserSessionUtils';


const SignUp = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryId: 0
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);

            // Basic validation
            if (formData.password !== formData.confirmPassword) {
                message.error("Passwords don't match!");
                return;
            }

            const registrationData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                primaryEmail: formData.email,
                password: formData.password,
                countryId: formData.countryId
            };

            const response = await new BaseApiService("/users/register")
                .postRequestWithJsonResponse(registrationData);

            if (response.accessToken) {
                UserSessionUtils.setUserAuthToken(response.accessToken);
                UserSessionUtils.setUserDetails({
                    fullName: `${response.user.firstName} ${response.user.lastName}`,
                    username: `${response.user.firstName} ${response.user.lastName}`,
                    email: response.user.primaryEmail,
                    userId: response.user.id
                });

                message.success("Registration successful!");
                onSuccess?.();
            }
         } catch (error) {
             message.error(error.message || "Registration failed. Please try again.");
         } finally {
             setLoading(false);
         }
    };


    const handleOAuthRegister = () => {
        // Implement OAuth registration logic here
        message.info("Google registration coming soon!");
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorPrimary: '#fdb10e',
                        hoverBorderColor: '#fdb10e',
                        borderRadius: 6,
                        controlHeight: 40,
                        fontSize: 15,
                        paddingInline: 10,
                        fontSizeIcon: 16,
                    },
                    Input: {
                        colorPrimary: '#fdb10e',
                        hoverBorderColor: '#fdb10e',
                        paddingInline: 10,
                        fontSizeIcon: 16,
                    },
                    Button: {
                        colorPrimary: '#fdb10e',
                        borderRadius: 6,
                        height: 40,
                        width: '10rem',
                        border: 'none',
                        fontSize: '15px'
                    },
                },
            }}
        >
            <section className='auth-section'>
                <div className="auth-container">
                    <div className="card" style={{ width: "400px", backgroundColor: "#111241", color: "#ffffff" }}>
                        <div className='auth-img-card'>
                            <img src={asset.logo} alt="" style={{ objectFit: "cover", height: "200px", width: "200px" }} />
                        </div>
                        <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1>
                    </div>

                    <div className="card" style={{ width: "400px", padding: "20px 30px" }}>
                        <h2 style={{ padding: "0" }}>Sign Up</h2>
                        <p>Create an account to access our services</p>

                        <Row gutter={[10, 0]}>
                            <Col span={12}>
                                <Input
                                    type="text"
                                    className='inputField'
                                    placeholder='First Name'
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </Col>
                            <Col span={12}>
                                <Input
                                    type="text"
                                    className='inputField'
                                    placeholder='Last Name'
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </Col>
                        </Row>


                        <Input
                            type="email"
                            className='inputField'
                            placeholder='Enter your Email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input.Password
                            className='inputField'
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ height: 40, display: "flex", alignItems: "center" }}
                        />

                        <Input.Password
                            className='inputField'
                            placeholder="Confirm password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            style={{ height: 40, display: "flex", alignItems: "center" }}
                        />

                        {loading ? <Button
                            className="auth-btn1"
                            disabled={loading}
                            style={{ background: '#111143', color: '#ffffff' }}
                        >
                            <Loading3QuartersOutlined spin={true}/>
                        </Button>

                            : <Button className="auth-btn1" onClick={handleRegister}
                                disabled={loading}
                                style={{ background: '#111143', color: '#ffffff' }}>Sign up</Button>}

                        {/* <p style={{ margin: "5px 0" }}>Or</p> */}

                        {/* <Button 
            className="auth-btn2" 
            onClick={handleOAuthRegister}
          >
            <img src={asset.googleIcon} alt="" style={{ width: 25, height: 25 }} /> 
            Sign Up with Google
          </Button> */}
                    </div>
                </div>
            </section>
        </ConfigProvider>
    );
};

SignUp.propTypes = {
    onSuccess: PropTypes.func,
};

export default SignUp;
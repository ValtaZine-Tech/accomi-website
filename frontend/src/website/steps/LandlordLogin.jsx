import { Button, Col, ConfigProvider, Form, Input, message, Row } from "antd";
import './styles.css'
import { BaseApiService } from "../../utils/BaseApiService";
import { UserSessionUtils } from "../../utils/UserSessionUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const LandlordLogin = ({onSuccess}) => {

  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
   
    // API-based authentication
    try {
      const response = await new BaseApiService("/auth/login").postRequestWithJsonResponse({
      userName,
        password,
      });
  
      if (response.accessToken) {
        UserSessionUtils.setUserAuthToken(response.accessToken);
        
        // Store user details from API response
        UserSessionUtils.setUserDetails({
          fullName: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.primaryEmail,
          userId: response.user.id,
          gender: response.user.gender,
          countryId: response.user.countryId,
          roles: response.user.roles
        });
  
        message.success("Logged in Successfully");
        onSuccess?.();
        navigate('/');
      }
    } catch (error) {
      message.error("Login failed");
      console.log('Login Error', error);
    }

  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: '#ffffff',
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              controlHeight: 40,
            },
            Select: {
              colorBorder: '#ffffff',
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
          }
        }}>
        <div className="step-container">
          <div className="step-card">
            <h1>Let&apos;s Log Into Your Account </h1>
          </div>
          <div className="step-card">
            <div className="profile-container">
              <div className="profile-card">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: 'left', marginBottom: 10 }}>Account Credientials</h2>
                    </Col>
                  </Row>



                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your email address" }]}
                      >
                        <Input placeholder="Enter your email address" value={userName}
              onChange={(e) => setUsername(e.target.value)} style={{ height: 40, minWidth: '25rem', display: "flex", alignItems: "center" }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>

                    <Col span={24}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your password" }]}
                      >
                        <Input.Password placeholder="Enter your Password"value={password}
              onChange={(e) => setPassword(e.target.value)} style={{ height: 40, minWidth: '25rem', display: "flex", alignItems: "center" }} />
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row gutter={16}>

                    <Col span={24}>
                      
                        <Button type="primary" onClick={handleLogin} style={{width: '100%', height: 40, background: '#fdb10e', fontSize: '1.1rem'}}>Sign in</Button>
                      
                    </Col>

                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider >
    </>
  );
};

LandlordLogin.propTypes = {
  onSuccess: PropTypes.func
};

export default LandlordLogin;
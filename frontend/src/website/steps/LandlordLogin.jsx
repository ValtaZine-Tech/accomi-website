/* eslint-disable no-unused-vars */
import { Button, Col, ConfigProvider, Form, Input, message, Row } from "antd";
import "./styles.css";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { BaseApiService } from "../../utils/BaseApiService";
import { UserSessionUtils } from "../../utils/UserSessionUtils";
import { useState } from "react";
import PropTypes from "prop-types";

const LandlordLogin = ({ onSuccess }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // API-based authentication
    // try {
    //   setLoading(true);
    //   const response = await new BaseApiService(
    //     "/auth/login"
    //   ).postRequestWithJsonResponse({
    //     userName,
    //     password,
    //   });
    //   if (response.accessToken) {
    //     UserSessionUtils.setUserAuthToken(response.accessToken);
    //     UserSessionUtils.setUserDetails({
    //       fullName: `${response.user.firstName} ${response.user.lastName}`,
    //       email: response.user.primaryEmail,
    //       userId: response.user.id,
    //       gender: response.user.gender,
    //       countryId: response.user.countryId,
    //       roles: response.user.roles,
    //     });
    //     message.success("Logged in Successfully");
    //     onSuccess();
    //   }
    // } catch (error) {
    //   message.error("Login failed");
    //   console.log("Login Error", error);
    // } finally {
    //   setLoading(false);
    // }
    // onSuccess();
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: "#ffffff",
              colorPrimary: "#fdb10e",
              hoverBorderColor: "#fdb10e",
              controlHeight: 40,
            },
            Select: {
              colorBorder: "#ffffff",
              colorPrimary: "#fdb10e",
              hoverBorderColor: "#fdb10e",
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
          },
        }}
      >
        <div className="step-container">
          <div className="step-card">
            <h1>Let&apos;s Log Into Your Account </h1>
          </div>
          <div className="step-card">
            <div className="profile-container">
              <div className="profile-login-card">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={20}>
                      <h2
                        style={{
                          color: "#8e8e8e",
                          textAlign: "left",
                          marginBottom: 10,
                        }}
                      >
                        Account Credientials
                      </h2>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "Please enter your email address or username",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your username or email address"
                          value={userName}
                          onChange={(e) => setUsername(e.target.value)}
                          style={{
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please enter your password",
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Enter your Password"
                          style={{
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone
                                style={{
                                  fontSize: 15,
                                  padding: 0,
                                  margin: 0,
                                  lineHeight: 0,
                                }}
                              />
                            ) : (
                              <EyeInvisibleOutlined
                                style={{
                                  fontSize: 15,
                                  padding: 0,
                                  margin: 0,
                                  lineHeight: 0,
                                }}
                              />
                            )
                          }
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={16}>
                      {loading ? (
                        <Button
                          type="primary"
                          className="auth-btn1"
                          style={{ color: "#fff", width: "100%", height: 40, fontSize: "1rem" }}
                        >
                          <LoadingOutlined spin />
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          className="auth-btn1"
                          onClick={handleLogin}
                          style={{ color: "#fff", width: "100%", height: 40, fontSize: "1rem" }}
                        >
                          Sign in
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

LandlordLogin.propTypes = {
  onSuccess: PropTypes.func,
};

export default LandlordLogin;

/* eslint-disable no-unused-vars */
import { Button, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./styles.css";
import { asset } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import PropTypes from 'prop-types';
import SignUp from "./SignUp";
import { CustomModal } from "../components/CustomalModal";


const Login2 = ({onSuccess}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activePath, setActivePath] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogin = async () => {
    // Simple login logic
    if (email === "guest" && password === "1234") {
      // dispatch(login({ user: email, role: 'student' }));
      message.success("Logged in Successfully");
      navigate('/');
      return;
    } else if (email === "admin" && password === "admin123") {    
      // dispatch(login({ user: email, role: 'admin' }));
      message.success("Logged in Successfully");
      navigate('/dashboard');
      return;
    }

    // API-based authentication
    try {
      const response = await new BaseApiService("/auth/login").postRequestWithJsonResponse({
        email,
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
          countryId: response.user.countryId
        });
  
        message.success("Logged in Successfully");
        onSuccess?.();
        navigate('/');
      }
    } catch (error) {
      message.error("Login failed");
    }

  };

  const handleOAuth = () => {
    console.log("OAuth Authentication");
    // Implement OAuth logic here
  };

  return (
    <>
      <section className="auth-section">
        <div className="auth-container custom-modal">

          <div
            className="card"
          >
            <div className="auth-img-card">
              <img
                src={asset.logo}
                alt=""
                style={{ objectFit: "cover", height: "200px", width: "200px" }}
              />
            </div>
            <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1>
          </div>

          <div
            className="card"
          >
            <h2 style={{ padding: "0", marginBottom: 10 }}>Sign in</h2>

            <Input
              type="text"
              className="inputField"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              className="inputField"
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: 40, display: "flex", alignItems: "center" }}
            />
            <div
              style={{
                marginTop: 10,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button className="auth-btn1" onClick={handleLogin}>
                Sign in
              </button>
              <p style={{ margin: "5px 0" }}>Or</p>
              <Button className="auth-btn2" onClick={handleOAuth}>
                {" "}
                <img
                  src={asset.googleIcon}
                  alt=""
                  style={{ width: 25, height: 25 }}
                />{" "}
                <p>Continue with Google</p>
              </Button>
            </div>

            <p style={{ marginTop: "10px", color: "#8e8e8e" }}>
              Don&apos;t have an account?{" "}
              <span style={{ color: "#fdb10e", cursor: 'pointer' }} onClick={showModal}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <CustomModal visible={isModalVisible} onClose={handleCancel}>
        <SignUp onLogin={handleLogin}/>
      </CustomModal>

    </>
  );
};

Login2.propTypes = {
  onSuccess: PropTypes.func
};


export default Login2;
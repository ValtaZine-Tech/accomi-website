/* eslint-disable no-unused-vars */
import { Button, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./styles.css";
import { asset } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import PropTypes from "prop-types";
import SignUp from "./SignUp";
import { CustomModal } from "../components/CustomalModal";

const Login2 = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activePath, setActivePath] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchAgentProfile = async (userId) => {
    try {
        console.log(`Fetching agent/owner profile for userId: ${userId}`);
        const response = await new BaseApiService("/property-owners")
            .getRequestWithJsonResponse({
                filter: `userId==${userId}`,
                offset: 0,
                limit: 1
            });

        console.log('API response:', response);
        return response?.[0] || null; // Access the first element of the array
    } catch (error) {
        console.error("Agent profile fetch error:", error);
        return null;
    }
};

 

  const handleLogin = async () => {
    // Simple login fallbacks
    if (userName === "guest" && password === "1234") {
      message.success("Logged in Successfully");
      return navigate("/");
    }
    if (userName === "admin" && password === "admin123") {
      message.success("Logged in Successfully");
      return navigate("/admin-dashboard");
    }

    try {
      const response = await new BaseApiService("/auth/login")
        .postRequestWithJsonResponse({ userName, password });

      if (!response.accessToken) {
        throw new Error("No access token received");
      }

      // Store auth token and basic user details
      UserSessionUtils.setUserAuthToken(response.accessToken);
      const { user } = response;

      const userDetails = {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.primaryEmail,
        roles: user.roles,
        countryId: user.countryId,
        gender: user.gender
      };

    
      // Handle agent-specific data
      if (user?.roles?.some(role => role.type === "LANDLORD")) {
        const ownerProfile = await fetchAgentProfile(user.id);

        if (!ownerProfile) {
            message.warning("Complete agent registration");
            return navigate("/agent-registration");
        }


        // Store agent details separately
        UserSessionUtils.setOwnerDetails(ownerProfile);

        // Add agent reference to user details
        userDetails.ownerId = ownerProfile.id;
      }


      // Store user details
      UserSessionUtils.setUserDetails(userDetails);

      // Force state update
      setIsAuthenticated(true);

      // Handle navigation
      const redirectPath = user.roles.some(r => r.type === "ADMIN") ? "/admin-dashboard"
        : user.roles.some(r => r.type === "LANDLORD") ? "/property-dashboard"
          : "/";

      message.success("Login successful");
      navigate(redirectPath);
      onSuccess?.();

    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || "Login failed");
    }
  };


  const handleOAuth = () => {
    console.log("OAuth Authentication");
    // Implement OAuth logic here
  };



  useEffect(() => {
    if (isAuthenticated) {
      const details = UserSessionUtils.getUserDetails();
      setUserDetails(details);
      console.log("User details:", details);
    } else {
      setUserDetails(null);
      console.log('No user details fetched')
    }
  }, [isAuthenticated]);



  return (
    <>
      <section className="auth-section">
        <div className="auth-container custom-modal">
          <div className="card">
            <div className="auth-img-card">
              <img
                src={asset.logo}
                alt=""
                style={{ objectFit: "cover", height: "200px", width: "200px" }}
              />
            </div>
            <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1>
          </div>

          <div className="card">
            <h2 style={{ padding: "0", marginBottom: 10 }}>Sign in</h2>

            <Input
              type="text"
              className="inputField"
              placeholder="Enter your Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
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
              <span
                style={{ color: "#fdb10e", cursor: "pointer" }}
                onClick={showModal}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <CustomModal visible={isModalVisible} onClose={handleCancel}>
        <SignUp onLogin={handleLogin} />
      </CustomModal>
    </>
  );
};

Login2.propTypes = {
  onSuccess: PropTypes.func,
};

export default Login2;

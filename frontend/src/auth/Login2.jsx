/* eslint-disable no-unused-vars */
import { Button, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { asset } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import PropTypes from "prop-types";

const Login2 = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = async () => {
    // Start loading animation
    setLoading(true);

    // Handle test accounts
    if (identifier === "guest" && password === "1234") {
      message.success("Logged in Successfully");
      setLoading(false); // Stop loading
      return navigate("/");
    }
    if (identifier === "admin" && password === "admin123") {
      message.success("Logged in Successfully");
      setLoading(false); // Stop loading
      return navigate("/admin-dashboard");
    }

    try {
      // 1. User authentication
      const loginResponse = await new BaseApiService(
        "/auth/login"
      ).postRequestWithJsonResponse({ identifier, password });

      if (!loginResponse.accessToken) {
        throw new Error("No access token received");
      }

      // 2. Store authentication token
      UserSessionUtils.setUserAuthToken(loginResponse.accessToken);
      const { user } = loginResponse;

      // 3. Create and store user details
      const userDetails = {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.primaryEmail,
        roles: user.roles,
        countryId: user.countryId,
        gender: user.gender,
      };
      UserSessionUtils.setUserDetails(userDetails);

      // 4. Fetch and store property owner details for landlords
      if (user.roles.some((r) => r.type === "LANDLORD")) {
        try {
          const ownerResponse = await new BaseApiService(
            `/property-owners/user/${user.id}`
          ).getRequestWithJsonResponse();

          UserSessionUtils.setOwnerDetails({
            id: ownerResponse.id,
            entityType: ownerResponse.entityType,
            status: ownerResponse.recordStatus,
            userId: user.id,
          });
        } catch (error) {
          console.error("Owner fetch error:", error);
          message.warning("Property owner profile not found");
        }
      }

      // 5. Determine redirect path
      const redirectPath = user.roles.some((r) => r.type === "ADMIN")
        ? "/admin-dashboard"
        : user.roles.some((r) => r.type === "LANDLORD")
        ? "/properties-dashboard"
        : "/";

      // 6. Finalize login
      message.success("Login successful");
      navigate(redirectPath);
      onSuccess?.();
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
            {/* <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1> */}
          </div>

          <div className="card">
            <h2 style={{ padding: "0", marginBottom: 10 }}>Welcome</h2>

            <Input
              type="text"
              className="inputField"
              placeholder="Enter your Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <Input.Password
              className="inputField"
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone style={{fontSize: 15, padding: 0, margin: 0, lineHeight: 0}}/> : <EyeInvisibleOutlined style={{fontSize: 15, padding: 0, margin: 0, lineHeight: 0}}/>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: "flex", alignItems: "center", paddingRight: 10 }}
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
              {loading ? (
                <Button
                  type="default"
                  className="auth-btn1"
                  style={{ color: "#fff" }}
                >
                  <LoadingOutlined spin />
                </Button>
              ) : (
                <Button
                  type="default"
                  className="auth-btn1"
                  onClick={handleLogin}
                  style={{ color: "#fff" }}
                >
                  Sign in
                </Button>
              )}

              <p style={{ margin: "5px 0" }}>Or</p>
              <Button type="default" className="auth-btn2" onClick={handleOAuth}>
                {" "}
                <img
                  src={asset.googleIcon}
                  alt=""
                  style={{ width: 25, height: 25 }}
                />{" "}
                <p>Continue with Google</p>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Login2.propTypes = {
  onSuccess: PropTypes.func,
};

export default Login2;

// eslint-disable-next-line no-unused-vars
import { Alert, Button, Input, Select, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./styles.css";
import { asset } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const Login = () => {
  // const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sample login logic
  const handleLogin = () => {
    let body = {
      email: "prime",
      password: "admin1234",
    };
    new BaseApiService("/auth/login")
      .postRequestWithJsonResponse(body)
      .then((response) => {
        UserSessionUtils.setUserAuthToken(response.accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButtonClick = () => {
    handleLogin();
  };

  return (
    <>
      <section className="auth-section">
        <div className="auth-container">
          <div
            className="card"
            style={{
              width: "400px",
              backgroundColor: "#111241",
              color: "#ffffff",
            }}
          >
            <div className="auth-img-card">
              <LazyLoadImage
                src={asset.logo}
                alt=""
                effect="blur"
                style={{ objectFit: "cover", height: "200px", width: "200px" }}
              />
            </div>
            <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1>
          </div>
          <div className="card" style={{ width: "350px", padding: "30px" }}>
            <h2 style={{ padding: "0" }}>Sign in</h2>
            <p>Enter Your Credentials to access your workspace</p>

            <Input
              type="text"
              className="inputField"
              placeholder="Enter your Accomi Email"
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
            />

            <Button
              type="default"
              className="auth-btn"
              style={{ marginTop: 20 }}
              onClick={handleButtonClick}
            >
              Sign in
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

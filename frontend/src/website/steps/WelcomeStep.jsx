/* eslint-disable no-unused-vars */
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Button } from "antd";
import { UserSessionUtils } from "../../utils/UserSessionUtils";

const WelcomeStep = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null); // Add state for user details

  useEffect(() => {
    const details = UserSessionUtils.getUserDetails();
    setUserDetails(details);
  }, []);

  // Get first name or fallback to 'there'
  const firstName = userDetails?.fullName?.split(' ')[0] || 'there';

  return (
    <>
      <div className="welcome-step-container">
        <div className="welcome-step-card">
          <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
            Welcome to Accomi! 🎉
          </h1>
          
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.1rem",
            color: "#666",
            marginBottom: "40px",
            lineHeight: 1.6
          }}>
            We&apos;re thrilled to have you on board, {firstName}!<br />
            Your property management journey starts now - let&apos;s turn your real estate into results!
          </p>

          <div className="welcome-btns-container">
            <Link to="/properties-dashboard">
              <button className="welcome-btn1">
                Launch Dashboard
              </button>
            </Link>
            <Link to="/">
              <button className="welcome-btn2">
                Maybe Later
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeStep;
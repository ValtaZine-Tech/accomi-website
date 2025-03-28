/* eslint-disable no-unused-vars */
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Button } from "antd";

const WelcomeStep = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  return (
    <>
      <div className="welcome-step-container">
        <div className="welcome-step-card">
          <h1 style={{ textAlign: "center" }}>
            Your All Set And Ready To Start Listing Your Properties.
          </h1>

          <div className="welcome-btns-container">
            <Link to="/properties-dashboard">
              <button className="welcome-btn1">
                Go to Dashboard
              </button>
            </Link>
            <Link to="/" >
              <button className="welcome-btn2">Maybe Later</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeStep;

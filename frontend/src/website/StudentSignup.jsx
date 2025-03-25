import { Button, ConfigProvider, message, Steps } from "antd";
import Navbar from "../partials/Navbar";
import "./styles.css";
import { useState } from "react";
import City from "./steps/City";
import University from "./steps/University";
import Transfer from "./steps/Transfer";
import Duration from "./steps/Duration";
import Budget from "./steps/Budget";
import HouseType from "./steps/HouseType";
import Profile from "./steps/Profile";
import { useNavigate } from "react-router-dom";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const next = () => {
    setCurrent((prev) => prev + 1);
  };
  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleStepComplete = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    next();
  };

  // In StudentSignup component
const handleSubmit = async (profileData) => {
    try {
      const finalData = {
        ...formData, // Data from previous steps
        ...profileData // Data from profile step
      };
  
      const response = await new BaseApiService("/student/register")
        .postRequestWithJsonResponse(finalData);
  
      if (response.accessToken) {
        UserSessionUtils.setUserAuthToken(response.accessToken);
        UserSessionUtils.setUserDetails({
          fullName: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.primaryEmail,
          userId: response.user.id,
          genderId: response.user.genderId,
        });
        
        message.success("Registration successful!");
        navigate('/');
      }
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const studentSteps = [
    {
      title: "City",
      content: <City onSuccess={handleStepComplete} />,
    },
    {
      title: "University",
      content: <University onSuccess={handleStepComplete} />,
    },
    {
      title: "Move In",
      content: <Transfer onSuccess={handleStepComplete} />,
    },
    {
      title: "Duration",
      content: <Duration onSuccess={handleStepComplete} />,
    },
    {
      title: "House Type",
      content: <HouseType onSuccess={handleStepComplete} />,
    },
    {
      title: "Budget",
      content: <Budget onSuccess={handleStepComplete} />,
    },
    {
      title: "Profile",
      content: <Profile onSubmit={handleSubmit} />,
    },
  ];

  const items = studentSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Steps: {
              colorPrimary: "#fdb10e",
              progressDot: true,
            },
          },
        }}
      >
        <Navbar />
        <>
          <section className="booking-container">
            <Steps current={current} items={items} progressDot={true} />
            <div style={contentStyle}>{studentSteps[current]?.content}</div>

            <div className="step-nav-btns" style={{ marginTop: 24 }}>
              {current > 0 && (
                <Button
                  type="primary"
                  className="step-exit-btn"
                  onClick={prev}
                  style={{
                    border: "2px solid #fdb10e",
                    background: "transparent",
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </Button>
              )}
              {current === 0 && (
                <Button
                  type="primary"
                  className="step-exit-btn"
                  onClick={() => navigate("/")}
                  style={{
                    border: "2px solid #fdb10e",
                    background: "transparent",
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </Button>
              )}
            </div>
          </section>
        </>
      </ConfigProvider>
    </>
  );
};

export default StudentSignup;

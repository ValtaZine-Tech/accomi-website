import { Button, ConfigProvider, message, Steps } from "antd";
import Navbar from "../partials/Navbar";
import "./styles.css";
import { useState } from "react";
import University from "./steps/University";
import Country from "./steps/Country";
import Profile from "./steps/Profile";
import { useNavigate } from "react-router-dom";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    country: null,
    university: null,
    profile: null,
  });

  const next = () => {
    setCurrent((prev) => prev + 1);
  };
  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleStepComplete = (stepName, stepData) => {
    setFormData((prev) => ({ ...prev, [stepName]: stepData }));
    next();
  };

  // In StudentSignup component
  const handleSubmit = async (profileData) => {
    try {
      const finalData = {
        ...formData.country,
        ...formData.university,
        ...profileData,
      };

      console.log("Final submission data:", finalData);

      const response = await new BaseApiService("/students/register")
        .postRequestWithJsonResponse(finalData);

      if (response.accessToken) {
        UserSessionUtils.setUserAuthToken(response.accessToken);
        UserSessionUtils.setUserDetails({
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          userName: response.user.userName,
          email: response.user.primaryEmail,
          userId: response.user.id,
          genderId: response.user.genderId,
          countryId: response.user.countryId,
          institutionId: response.user.institutionId
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
      title: "Country",
      content: (
        <Country onSuccess={(data) => handleStepComplete("country", data)} />
      ),
    },
    {
      title: "University",
      content: (
        <University
          onSuccess={(data) => handleStepComplete("university", data)}
        />
      ),
    },
    {
      title: "Profile",
      content: (
        <Profile
          onSubmit={handleSubmit}
          countryId={formData.country?.countryId}
          institutionId={formData.university?.institutionId}
        />
      ),
    },
  ];

  const items = studentSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    marginBottom: 50,
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

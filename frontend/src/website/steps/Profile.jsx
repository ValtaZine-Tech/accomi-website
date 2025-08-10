import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { BaseApiService } from "../../utils/BaseApiService";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GENDER_OPTIONS } from "../../constants/Constants";
// import { UserSessionUtils } from "../../utils/UserSessionUtils";
import "./styles.css";

const { Option } = Select;

const Profile = ({ onSubmit, countryId, institutionId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    primaryEmail: "",
    password: "",
    confirmPassword: "",
    primaryPhoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const genders = GENDER_OPTIONS;

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (formData.password !== formData.confirmPassword) {
        message.error("Passwords don't match!");
        return;
      }

      const generatedUsername = `${formData.firstName} ${formData.lastName}`
        .toLowerCase()
        .replace(/\s+/g, "_");

      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: generatedUsername,
        primaryEmail: formData.primaryEmail,
        password: formData.password,
        primaryPhoneNumber: formData.primaryPhoneNumber,
        genderId: formData.genderId,
        countryId,
        institutionId
      };

      onSubmit(registrationData);
    } catch (error) {
      let errorMessage =
        "Registration failed. Please check your information and try again.";

      if (error.response?.data?.message?.includes("email")) {
        errorMessage =
          "This email is already registered. Please use a different email.";
      } else if (error.response?.status === 400) {
        errorMessage =
          "Invalid registration details. Please check your inputs.";
      }

      message.error(errorMessage);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParameters = { offset: 0, limit: 0 };

    // Sample for GET request
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await new BaseApiService(
          "/lookups/countries"
        ).getRequestWithJsonResponse(searchParameters);

        // Handle empty response
        if (!response?.records?.length) {
          setError("No countries found");
          return;
        }
      } catch (err) {
        setError(err.message || "Failed to load countries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Let&apos;s know more about you </h1>
        </div>
        <div className="step-card">
          <div className="profile-container">
            <div className="profile-card">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={24}>
                    <h2
                      style={{
                        color: "#8e8e8e",
                        textAlign: "left",
                        marginBottom: 15,
                      }}
                    >
                      Personal Information
                    </h2>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your first name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email address",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your email address"
                        value={formData.primaryEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryEmail: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Contact"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your contact",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your contact"
                        maxLength={10}
                        value={formData.primaryPhoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryPhoneNumber: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Gender"
                      rules={[
                        {
                          required: false,
                          message: "Please select your phone number",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select your Gender"
                        style={{ height: 40, textAlign: "left" }}
                        value={formData.genderId}
                        onChange={(value) =>
                          setFormData({ ...formData, genderId: value })
                        }
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        notFoundContent={
                          isLoading
                            ? "Loading genders..."
                            : error
                            ? "Error loading genders"
                            : "No Genders found"
                        }
                        disabled={isLoading || error}
                      >
                        {genders.map((gender) => (
                          <Option key={gender.id} value={gender.id}>
                            {gender.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Password"
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
                        }}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Confirm Passwprd"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm Password"
                        style={{
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                        }}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    {loading ? (
                      <Button
                        // className="auth-btn1"
                        type="default"
                        style={{
                          background: "#fdb10e",
                          color: "#ffffff",
                          flex: 1,
                          width: "100%",
                          height: 40,
                          fontSize: "1rem",
                        }}
                      >
                        <LoadingOutlined spin />
                      </Button>
                    ) : (
                      <Button
                        // className="auth-btn1"
                        type="default"
                        onClick={handleRegister}
                        disabled={loading}
                        style={{
                          background: "#fdb10e",
                          color: "#ffffff",
                          flex: 1,
                          width: "100%",
                          height: 40,
                          fontSize: "1rem",
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Profile.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Profile;

import { Button, Col, ConfigProvider, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { BaseApiService } from "../../utils/BaseApiService";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';

const { Option } = Select;

const Profile = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    primaryPhone: "",
    countryId: null,
  });
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



const handleRegister = async () => {
    try {
      setLoading(true);

      // Validation
      if (formData.password !== formData.confirmPassword) {
        message.error("Passwords don't match!");
        return;
      }

      // Prepare profile data
      const profileData = {
        userDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          primaryEmail: formData.primaryEmail,
          primaryPhone: formData.primaryPhone,
          countryId: formData.countryId,
          genderId: formData.genderId,
        },
        credentials: {
          password: formData.password
        }
      };

      // Pass data to parent component
      await onSubmit(profileData);

    } catch (error) {
      message.error(error.message || "Registration failed. Please try again.");
    } finally {
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

        const sortedCountries = response.records.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedCountries);
      } catch (err) {
        setError(err.message || "Failed to load countries");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGenders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await new BaseApiService(
          "/lookups/genders"
        ).getRequestWithJsonResponse(searchParameters);

        // Handle empty response
        if (!response?.records?.length) {
          setError("No countries found");
          return;
        }

        const sortedCountries = response.records.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setGenders(sortedCountries);
      } catch (err) {
        setError(err.message || "Failed to load countries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
    fetchGenders();
  }, []);

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
            Button: {
              hoverBorderColor: "#f4f4f4",
            },
          },
        }}
      >
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
                      <h2 style={{ color: "#8e8e8e", textAlign: "left" }}>
                        Personal Information
                      </h2>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
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
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your phone number"
                          maxLength={10}
                          value={formData.primaryPhone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              primaryPhone: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
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
                          optionFilterProp="children" // Search against the children (gender names)
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
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: "left" }}>
                        National Information
                      </h2>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please select your nationality",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select your nationality"
                          style={{ height: 40, textAlign: "left" }}
                          value={formData.countryId}
                          onChange={(value) =>
                            setFormData({ ...formData, countryId: value })
                          }
                          showSearch // Enable search functionality
                          optionFilterProp="children" // Search against the children (country names)
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              .toLowerCase()
                              .localeCompare(optionB.children.toLowerCase())
                          }
                          notFoundContent={
                            isLoading
                              ? "Loading countries..."
                              : error
                              ? "Error loading countries"
                              : "No countries found"
                          }
                          disabled={isLoading || error}
                        >
                          {countries.map((country) => (
                            <Option key={country.id} value={country.id}>
                              {country.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: "left" }}>
                        Account Credientials
                      </h2>
                    </Col>

                    <Col span={12}>
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
                          type="primary"
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
                          type="primary"
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
                          Create Account
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

Profile.PropTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Profile;

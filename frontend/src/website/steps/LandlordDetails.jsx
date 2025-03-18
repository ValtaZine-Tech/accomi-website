import { Button, Col, ConfigProvider, Form, Input, message, Row, Select } from "antd";
import { UserSessionUtils } from "../../utils/UserSessionUtils";
import { BaseApiService } from "../../utils/BaseApiService";
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const { Option } = Select;

const LandlordDetails = ({ onSuccess }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    primaryPhone: '',
    countryId: null,
  });
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        message.error("Passwords don't match!");
        return;
      }

      const generatedUsername = `${formData.firstName} ${formData.lastName}`
        .toLowerCase()
        .replace(/\s+/g, '_');

      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: generatedUsername,
        primaryEmail: formData.email,
        password: formData.password,
        primaryPhone: formData.primaryPhone,
        countryId: formData.countryId
      };

      const response = await new BaseApiService("/property-owners/register")
        .postRequestWithJsonResponse(registrationData);

      if (response.accessToken) {
        UserSessionUtils.setUserAuthToken(response.accessToken);
        UserSessionUtils.setUserDetails({
          fullName: `${response.user.firstName} ${response.user.lastName}`,
          username: generatedUsername,
          email: response.user.primaryEmail,
          userId: response.user.id
        });

        message.success("Registration successful!");
        onSuccess?.();
      }
    } catch (error) {
      message.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const searchParameters = { offset: 0, limit: 0 };

  // Sample for GET request
  const fetchCountries = async () => {
    try {
      const response = await new BaseApiService("/lookups/countries")
        .getRequestWithJsonResponse(searchParameters);

      // Sort countries alphabetically by name
      const sortedCountries = (response.records || []).sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCountries(sortedCountries);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Added empty dependency array to ensure this runs only once on mount
  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: '#ffffff',
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              controlHeight: 40,
            },
            Select: {
              colorBorder: '#ffffff',
              colorPrimary: '#fdb10e',
              hoverBorderColor: '#fdb10e',
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            Button: {
              hoverBorderColor: '#f4f4f4',
            }
          }
        }}>
        <div className="step-container">
          <div className="step-card">
            <h1>Let&apos;s Create Your Account </h1>
          </div>
          <div className="step-card">
            <div className="profile-container">
              <div className="profile-card">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: 'left' }}>Personal Information</h2>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your first name" }]}
                      >
                        <Input
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your last name" }]}
                      >
                        <Input
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your email address" }]}
                      >
                        <Input
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your phone number" }]}
                      >
                        <Input
                          placeholder="Enter your phone number"
                          maxLength={10}
                          value={formData.primaryPhone}
                          onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: 'left' }}>National Information</h2>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        rules={[{ required: true, message: "Please select your nationality" }]}
                      >
                        <Select
                          placeholder="Select your nationality"
                          style={{ height: 40, textAlign: "left" }}
                          value={formData.countryId}
                          onChange={(value) => setFormData({ ...formData, countryId: value })}
                        // showSearch
                        // disabled={isLoading || error}
                        >
                          {error ? (
                            <Option value="" disabled>Error loading countries</Option>
                          ) : isLoading ? (
                            <Option value="" disabled>Loading...</Option>
                          ) : (
                            countries.map(country => (
                              <Option key={country.id} value={country.id}>
                                {country.name}
                              </Option>
                            ))
                          )}
                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e", textAlign: 'left' }}>Account Credientials</h2>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your password" }]}
                      >
                        <Input.Password
                          placeholder="Enter your Password"
                          style={{ height: 40, display: "flex", alignItems: "center" }}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please confirm your password" }]}
                      >
                        <Input.Password
                          placeholder="Confirm Password"
                          style={{ height: 40, display: "flex", alignItems: "center" }}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>

                    <Col span={24}>

                      {loading ? <Button
                        // className="auth-btn1"
                        type="primary"
                        disabled={loading}
                        style={{ background: '#fdb10e', color: '#ffffff', flex: 1, width: '100%', height: 40, fontSize: '1rem' }}>
                        <Loading3QuartersOutlined spin={true} />
                      </Button>

                        : <Button
                          // className="auth-btn1"
                          type="primary"
                          onClick={handleRegister}
                          disabled={loading}
                          style={{ background: '#fdb10e', color: '#ffffff', flex: 1, width: '100%', height: 40, fontSize: '1rem' }}>Create Account</Button>}

                    </Col>

                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider >
    </>
  );
};

LandlordDetails.propTypes = {
  onSuccess: PropTypes.func,
};

export default LandlordDetails;
import { Col, ConfigProvider, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const LandlordDetails = () => {
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
                      <h2 style={{ color: "#8e8e8e" }}>Personal Information</h2>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your first name" }]}
                      >
                        <Input placeholder="Enter your first name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your last name" }]}
                      >
                        <Input placeholder="Enter your last name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your email address" }]}
                      >
                        <Input placeholder="Enter your email address" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your phone number" }]}
                      >
                        <Input placeholder="Enter your phone number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e" }}>National Information</h2>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        rules={[{ required: true, message: "Please select your nationality" }]}
                      >
                        <Select placeholder="Select your nationality" style={{ height: 40, textAlign: "left" }}>
                          <Option value="uganda">Uganda</Option>
                          <Option value="kenya">Kenya</Option>
                          <Option value="tanzania">Tanzania</Option>
                          <Option value="rwanda">Rwanda</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <h2 style={{ color: "#8e8e8e" }}>Account Credientials</h2>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please enter your password" }]}
                      >
                        <Input.Password placeholder="Enter your Password" style={{ height: 40, display: "flex", alignItems: "center" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[{ required: true, message: "Please confirm your password" }]}
                      >
                        <Input.Password placeholder="Confirm Password" style={{ height: 40, display: "flex", alignItems: "center" }} />
                      </Form.Item>
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

export default LandlordDetails;
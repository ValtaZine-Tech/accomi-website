/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, Row, Col, Typography, Divider, Upload, Image, message } from "antd";
import './styles.css'

const { Option } = Select;
const { Title } = Typography;

const LandlordForm = () => {

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>Landlord Form</h2>
                </Divider>
            </div>

            <div className='form-card'>

                <Form
                    name="property_form"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        wifi: false,
                    }}
                >
                    {/* Property Details Section */}
                    <Title level={4} style={{ marginBottom: 0 }}>
                        Property Details
                    </Title>
                    <Divider />
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Form.Item
                                label="Property Name"
                                name="propertyName"
                                rules={[{ required: true, message: "Property Name is required!" }]}
                                style={{ marginBottom: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Availability Status" name="availabilityStatus" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                                <Select placeholder="Select Status">
                                    <Option value="available">Available</Option>
                                    <Option value="unavailable">Unavailable</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Number of Bedrooms" name="bedrooms" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Number of Bathrooms" name="bathrooms" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Property Type" name="propertyType" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                                <Select placeholder="Select Type">
                                    <Option value="apartment">Apartment</Option>
                                    <Option value="studio">Studio</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Property Owner"
                                name="propertyOwner"
                                rules={[{ required: true, message: "Property Owner's name is required!" }]}
                                style={{ marginBottom: 5 }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Property Decription"
                                name="propertyDescription"
                                rules={[{ required: true, message: "Talk about your property!" }]}
                                style={{ marginBottom: 5 }}
                            >
                                <Input.TextArea rows={5} />
                            </Form.Item>
                        </Col>
                    </Row>


                    {/* Amenities Section */}
                    <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
                        Amenities
                    </Title>
                    <Divider />
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Form.Item label="Furnishing Status" name="furnishingStatus" style={{ marginBottom: 10 }}>
                                <Select placeholder="Select Status">
                                    <Option value="furnished">Furnished</Option>
                                    <Option value="unfurnished">Unfurnished</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Parking Status" name="parkingStatus" style={{ marginBottom: 10 }}>
                                <Select placeholder="Select Status">
                                    <Option value="available">Parking Available</Option>
                                    <Option value="unavailable">No Parking Available</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Laundry Services" name="laundry" style={{ marginBottom: 10 }}>
                                <Select placeholder="Select Status">
                                    <Option value="available">Laundry Services Available</Option>
                                    <Option value="unavailable">Laundry Services Unavailable</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Lifestyle Amenities" name="amenities" style={{ marginBottom: 10 }}>
                                <Checkbox.Group>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="wifi">WiFi</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="gym">Gym</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="pool">Pool</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="pets">Pets</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                            <Form.Item label="Security Features" name="security" style={{ marginBottom: 10 }}>
                                <Checkbox.Group>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="securityPersonnel">Security Personnel</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="cctvSurveillance">CCTV Surveillance</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="restrictedAccess">Restricted Access</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="fencingWalls">Fencing/Walls</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="videoDoorPhones">Video Door Phones</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="motionSensingLights">Motion-Sensing Lights</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="panicButtons">Panic Buttons</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="emergencyResponse">Emergency Response</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>

                        </Col>
                    </Row>


                    {/* Submit Button */}
                    <Row justify="center" style={{ marginTop: 20 }} gutter={[50, 0]}>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block style={{backgroundColor:"#111241"}}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item>
                                <Button type="default" htmlType="reset" block>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                    {/* <Row justify="center" style={{ marginTop: -10 }}>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="default" htmlType="reset" block>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row> */}
                </Form>

            </div>
        </>
    )
}

export default LandlordForm
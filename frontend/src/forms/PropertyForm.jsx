/* eslint-disable no-unused-vars */

import { useState } from 'react'
import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, Row, Col, Typography, Divider, Upload, Image, message } from "antd";
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
import './styles.css'
import Dragger from 'antd/es/upload/Dragger';


const { Option } = Select;
const { Title } = Typography;


const PropertyForm = () => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Helper function to read image file as base64
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleImagePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj); // Convert to base64 preview
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onPreview: handleImagePreview,
    };

    const props2 = {
        name: 'file',
        multiple: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onPreview: handleImagePreview,
    };
    
    const onFinish = (values) => {
        console.log('Form Values:', values);
    };



    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>Property Form</h2>
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

                    {/* Property  Section */}
                    <Title level={4} style={{ marginBottom: 0 }}>
                        Property Images
                    </Title>
                    <Divider />
                    <Row gutter={[10, 0]}>
                        <Col span={8} style={{ display: 'flex' }}> {/* Apply flex layout to the column */}
                            <Form.Item
                                label="Cover Image"
                                name="coverImage"
                                rules={[{ required: true, message: "Please upload at least 1 image!" }]}
                                style={{ flex: 1 }} // Make the Form.Item fill the available space
                            >
                                <div>
                                <Dragger {...props2}>
                                    <p className="ant-upload-drag-icon">
                                        <PlusOutlined style={{ color: "#fdb10e" }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for single uploads. Prohibited from uploading any copyrighted images.
                                    </p>
                                </Dragger>
                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: 'none',
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </div>
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                            <Form.Item
                                label="Other Image"
                                name="otherImage"
                                rules={[{ required: false, message: "Please upload at least 1 image!" }]}
                            >
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: "#fdb10e" }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                        banned files.
                                    </p>
                                </Dragger>
                            </Form.Item>
                        </Col>
                    </Row>



                    {/* Location Details Section */}
                    <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
                        Location Details
                    </Title>
                    <Divider />
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Form.Item label="Distance from City (km)" name="distanceFromCity" style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Distance from Campus (km)" name="distanceFromCampus" style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Address" name="address" style={{ marginBottom: 5 }}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Location Latitude" name="locationLat" style={{ marginBottom: 5 }}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Location Longitude" name="locationLong" style={{ marginBottom: 5 }}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Country" name="country" style={{ marginBottom: 5 }}>
                                <Input />
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

                    {/* Lease Details Section */}
                    <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
                        Lease Details
                    </Title>
                    <Divider />
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Form.Item label="Move-in Date" name="moveInDate" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Security Deposit" name="securityDeposit" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} prefix="UGX." />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Monthly Rent" name="monthlyRent" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} prefix="UGX." />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Row justify="center" style={{ marginTop: 20 }}>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </div>
        </>
    )
}

export default PropertyForm

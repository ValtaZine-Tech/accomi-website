/* eslint-disable no-unused-vars */

import { useState } from 'react'
import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, Row, Col, Typography, Divider, Upload, Image, message } from "antd";
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
import './styles.css'
import Dragger from 'antd/es/upload/Dragger';
import { BaseApiService } from '../utils/BaseApiService';
import { UserSessionUtils } from '../utils/UserSessionUtils';


const { Option } = Select;
const { Title } = Typography;


const PropertyForm = () => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [fileList, setFileList] = useState([]);

    // Helper function to read image file as base64
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleImageUpload = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('files', file); 
        try {
            const response = await new BaseApiService("/images/upload").postMultipartWithJsonResponse(formData);
            // console.log('Image upload response:', response);
            const imageUrls = response; 
            file.response = imageUrls; 
            onSuccess(imageUrls); 
        } catch (error) {
            // console.error('Image upload error:', error);
            onError(error);
        }
    };

    const handleImageChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadProps = {
        customRequest: handleImageUpload,
        listType: "picture-card",
        fileList: fileList,
        onChange: handleImageChange,
        onPreview: handlePreview,
        multiple: true,
        accept: "image/*",
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
            }
            return isImage;
        }
    };


    const onFinish = async (values) => {
        try {
            const userDetails = UserSessionUtils.getUserDetails();
            const propertyOwnerId = userDetails?.ownerId;


            if (!propertyOwnerId) {
                throw new Error("User is not associated with a property owner account");
            }

            const imageUrls = fileList.map(file => file.response).flat();
            console.log('Image URLs:', imageUrls);


            const formattedValues = {
                ...values,
                countryId: userDetails.countryId,
                // amenitiesIds: values.amenities || [],
                securityDeposit: values.securityDeposit,
                price: values.monthlyRent,
                unit: "UGX",
                imageUrls: imageUrls,
                available: values.availabilityStatus === 'available',
                ownerId: propertyOwnerId
            };

            console.log('Submitting:', formattedValues);

            const response = await new BaseApiService("/properties/list").postRequestWithJsonResponse(formattedValues);
            console.log('Submission successful:', response);

            message.success('Property created successfully!');
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error('Submission error:', error);
            message.error(error.response?.message || error.message || 'Error creating property');
        }
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
                    form={form}
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
                                    <Option value="occupied">Occupied</Option>
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


                        <Col span={24}>
                            <Form.Item
                                label="Property Decription"
                                name="description"
                                rules={[{ required: true, message: "Talk about your property, briefly!" }]}
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

                        <Col span={24}>
                            <Form.Item
                                label="Images"
                                name="imageUrls"
                                rules={[{ required: true, message: "Please upload at least 1 image!" }]}
                            >
                                <Dragger {...uploadProps}>
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
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),

                                    }}
                                    src={previewImage}
                                />
                            )}
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
                                            <Checkbox value="1">WiFi</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="2">Gym</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="3">Pool</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="4">Pets</Checkbox>
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
                                            <Checkbox value="5">Security Personnel</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="6">CCTV Surveillance</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="7">Restricted Access</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="8">Fencing/Walls</Checkbox>
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

                        <Col span={12}>
                            <Form.Item label="Security Deposit" name="securityDeposit" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} prefix="UGX." />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Monthly Rent" name="monthlyRent" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} prefix="UGX." />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Row justify="center" style={{ marginTop: 20 }} gutter={[50, 0]}>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" htmlType='submit' block style={{ backgroundColor: '#111241', height: 40 }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="default" htmlType="reset" block style={{ height: 40 }}>
                                    Cancel
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

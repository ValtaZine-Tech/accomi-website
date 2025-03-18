/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, message, Row, Select, Space, Table, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import { Option } from 'antd/es/mentions'

const UniversityForm = () => {

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
                    <h2>Institution Form</h2>
                </Divider>

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
                            Institution Details
                        </Title>
                        <Divider />
                        <Row gutter={[10, 0]}>

                            <Col span={24}>
                                <Form.Item
                                    label="University Name"
                                    name="propertyName"
                                    rules={[{ required: true, message: "Property Name is required!" }]}
                                    style={{ marginBottom: 5 }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label="Email"
                                    name="universityEmail"
                                    rules={[{ required: true, message: "University Email is required!" }]}
                                    style={{ marginBottom: 5 }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Contact"
                                    name="universityContact"
                                    rules={[{ required: true, message: "University Email is required!" }]}
                                    style={{ marginBottom: 5 }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Other Contacts"
                                    name="universityEmail"
                                    rules={[{ required: true, message: "University Email is required!" }]}
                                    style={{ marginBottom: 5 }}
                                >
                                    <Input />
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

                            <Col span={16}>
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

                        

                        {/* Submit Button */}
                        <Row justify="center" style={{ marginTop: 20 }} gutter={[50,0]}>
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
                    </Form>
                </div>



            </div>
        </>
    )
}

export default UniversityForm

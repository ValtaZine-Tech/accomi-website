/* eslint-disable no-unused-vars */
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col, Upload, Image, message, Steps } from "antd";
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";
import "./styles.css";
import PropTypes from 'prop-types';

const PropertyDetails = ({ onNext }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

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
    onNext(); // Navigate to the verification step
  };

  const propertySteps = [
    {
      title: 'Details',
      content:
        <>
          <div className="property-card">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <Form.Item
                  label="Property Name"
                  name="propertyName"
                  rules={[{ required: true, message: "Property Name is required!" }]}
                  style={{ marginBottom: 5 }}
                >
                  <Input style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Ownership"
                  name="ownership"
                  rules={[{ required: true, message: "Property Name is required!" }]}
                  style={{ marginBottom: 5 }}
                >
                  <Select style={{ width: "100%", height: 35, textAlign: "left" }}>
                    <Option value="agent">Agent</Option>
                    <Option value="landlord">Landlord</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Availability Status" name="availabilityStatus" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                  <Select style={{ width: "100%", height: 35, textAlign: "left" }}>
                    <Option value="available">Available</Option>
                    <Option value="unavailable">Unavailable</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Number of Bedrooms" name="bedrooms" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Number of Bathrooms" name="bathrooms" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Property Type" name="propertyType" rules={[{ required: true }]} style={{ marginBottom: 5 }}>
                  <Select style={{ width: "100%", height: 35, textAlign: "left" }}>
                    <Option value="apartment">Apartment</Option>
                    <Option value="studio">Studio</Option>
                  </Select>
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
          </div>
        </>,
    },
    {
      title: 'Images',
      content:
        <>
          <div className="property-card">
            <Row gutter={[5, 0]}>
              <Col span={24} style={{ display: 'flex' }}>
                <Form.Item
                  label="Cover Image"
                  name="coverImage"
                  rules={[{ required: true, message: "Please upload at least 1 image!" }]}
                  style={{ flex: 1, maxWidth: 500 }}
                >
                  <div>
                    <Dragger {...props2}>
                      <p className="ant-upload-drag-icon">
                        <PlusOutlined style={{ color: "#fdb10e", fontSize: 40, }} />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag image here to upload cover image
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

              <Col span={24}>
                <Form.Item
                  label="Other Images"
                  name="otherImage"
                  rules={[{ required: false, message: "Please upload at least 1 image!" }]}
                >
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: "#fdb10e", fontSize: 40, }} />
                    </p>
                    <p className="ant-upload-hint">
                      Click or drag images here to upload other property images
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>,
    },
    {
      title: 'Location',
      content:
        <>
          <div className="property-card">
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Form.Item label="Distance from City (km)" name="distanceFromCity" style={{ marginBottom: 10 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Distance from Campus (km)" name="distanceFromCampus" style={{ marginBottom: 10 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Location Latitude" name="locationLat" style={{ marginBottom: 5 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Location Longitude" name="locationLong" style={{ marginBottom: 5 }}>
                  <InputNumber min={0} style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Country" name="country" style={{ marginBottom: 5 }}>
                  <Select style={{ height: 35, textAlign: "left" }}>
                    <Option value="uganda">Uganda</Option>
                    <Option value="kenya">Kenya</Option>
                    <Option value="tanzania">Tanzania</Option>
                    <Option value="rwanda">Rwanda</Option>
                    {/* Add more options as needed */}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address" name="address" style={{ marginBottom: 5 }}>
                  <Input style={{ width: "100%", height: 35 }} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>,
    },
    {
      title: 'Amenities',
      content:
        <>
          <div className="property-card">
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Form.Item label="Furnishing Status" name="furnishingStatus" style={{ marginBottom: 10 }}>
                  <Select placeholder="Select Status" style={{ textAlign: "left", height: 35 }}>
                    <Option value="furnished">Furnished</Option>
                    <Option value="unfurnished">Unfurnished</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Parking Status" name="parkingStatus" style={{ marginBottom: 10 }}>
                  <Select placeholder="Select Status" style={{ textAlign: "left", height: 35 }}>
                    <Option value="available">Available</Option>
                    <Option value="unavailable">Unavailable</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Laundry Services" name="laundry" style={{ marginBottom: 10 }}>
                  <Select placeholder="Select Status" style={{ textAlign: "left", height: 35 }}>
                    <Option value="available">Available</Option>
                    <Option value="unavailable">Unavailable</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Lifestyle Amenities" name="amenities" style={{ marginBottom: 10 }}>
                  <Select mode="multiple" placeholder="Select Available Amenities" style={{ textAlign: "left", minHeight: 40 }}>
                    <Option value="wifi">WiFi</Option>
                    <Option value="gym">Gym</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="pets">Pets</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Security Features" name="security" style={{ marginBottom: 10 }}>
                  <Select mode="multiple" placeholder="Select Security Features" style={{ textAlign: "left", minHeight: 40 }}>
                    <Option value="securityPersonnel">Security Personnel</Option>
                    <Option value="cctvSurveillance">CCTV Surveillance</Option>
                    <Option value="restrictedAccess">Restricted Access</Option>
                    <Option value="fencingWalls">Fencing/Walls</Option>
                    <Option value="videoDoorPhones">Video Door Phones</Option>
                    <Option value="motionSensingLights">Motion-Sensing Lights</Option>
                    <Option value="panicButtons">Panic Buttons</Option>
                    <Option value="emergencyResponse">Emergency Response</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>,
    },
    {
      title: 'Lease',
      content:
        <>
          <div className="property-card">
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Form.Item label="Move-in Date" name="moveInDate" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ width: "100%",height:35 }} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Security Deposit" name="securityDeposit" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                  <InputNumber min={0} style={{ width: "100%",height:35 }} prefix="UGX." />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Monthly Rent" name="monthlyRent" rules={[{ required: true }]} style={{ marginBottom: 10 }}>
                  <InputNumber min={0} style={{ width: "100%",height:35 }} prefix="UGX." />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>,
    }

  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const back = () => {
    setShowPropertyForm(false);
  }

  const items = propertySteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  };

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Let&apos;s know about your property. <span style={{ fontWeight: 400, color: '#6e6e6e' }}>(optional)</span></h1>
        </div>
        <div className="step-card">
          {!showPropertyForm ? (
            <div className="property-type-card" onClick={() => setShowPropertyForm(true)}>
              <div></div>
              <div>
                <p>Add Property</p>
              </div>
            </div>
          ) : (
            <div className='property-container' style={{ marginTop: 20 }}>
              <Steps
                current={current}
                items={items}
                navArrowColor='#fdb10e'
                direction="vertical"
              />
              <div style={contentStyle}>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                >
                  {propertySteps[current]?.content}
                </Form>
              </div>

              <div
                className='sub-step-nav-btns'
              >
                {current > 0 && (
                  <Button
                    type='primary'
                    className='sub-step-prev-btn'
                    onClick={() => prev()}
                    style={{ background: "#fdb10e" }}
                  >
                    Previous
                  </Button>
                )}
                {current === 0 && (
                  <Button
                    type='primary'
                    className='sub-step-exit-btn'
                    onClick={() => back()}
                    style={{ border: "2px solid #fdb10e", background: "transparent", color: "#fdb10e" }}
                  >
                    Cancel
                  </Button>
                )}
                {current < propertySteps.length - 1 && (
                  <Button type="primary" className='sub-step-next-btn' onClick={() => next()} style={{ background: "#fdb10e" }}>
                    Next
                  </Button>
                )}
                {/* {current === propertySteps.length - 1 && (
                  <Button type="primary" className='sub-step-done-btn' htmlType="submit" style={{ background: "transparent", border: "2px solid #fdb10e", color: "#fdb10e" }}>
                    Submit
                  </Button>
                )} */}

              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}
PropertyDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};


export default PropertyDetails;
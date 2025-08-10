/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Upload,
  Image,
  message,
} from "antd";
import {
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./styles.css";
import Dragger from "antd/es/upload/Dragger";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const { Option } = Select;
const { Title } = Typography;

const selectBefore = (
  <Select defaultValue="UGX" style={{ width: 100 }}>
    <Option value="USD">USD</Option>
    <Option value="EUR">EUR</Option>
    <Option value="UGX">UGX</Option>
  </Select>
);

const PropertyForm = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  const [ownerId, setOwnerId] = useState(null);
  const [checkingOwner, setCheckingOwner] = useState(true);

  useEffect(() => {
    const checkOwnerProfile = async () => {
      try {
        const userDetails = UserSessionUtils.getUserDetails();
        
        if (!userDetails) {
          message.error("You need to be logged in!");
          return;
        }
  
        // Check if user has Property Owner role
        const isOwner = userDetails.roles.some(
          role => role.type === "LANDLORD"
        );
  
        if (!isOwner) {
          message.error("You need Property Owner privileges!");
          return;
        }
  
        // Fetch property owners with valid pagination parameters
        const response = await new BaseApiService(
          "/property-owners"
        ).getRequestWithJsonResponse({
          offset: 0,   // Must be integer
          limit: 1000  // Set to a realistically high number
        });
  
        // Response is a direct array - no .records needed
        const matchingOwner = response.find(
          owner => owner.user.id === userDetails.id
        );
  
        if (matchingOwner?.id) {
          setOwnerId(matchingOwner.id);
        } else {
          message.error("Complete your owner profile first!");
        }
      } catch (error) {
        console.error("Owner check error:", error);
        message.error("Error verifying owner profile");
      } finally {
        setCheckingOwner(false);
      }
    };
  
    checkOwnerProfile();
  }, []);

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
    formData.append("files", file);
    try {
      const response = await new BaseApiService(
        "/images/upload"
      ).postMultipartWithJsonResponse(formData);
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
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    },
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const userDetails = UserSessionUtils.getUserDetails();

      if (!ownerId) {
        message.error("Owner verification pending!");
        return;
      }
  
      const imageUrls = fileList.map((file) => file.response).flat();
      
      const formattedValues = {
        ...values,
        countryId: userDetails.countryId,
        securityDeposit: values.securityDeposit,
        price: values.monthlyRent,
        unit: "UGX",
        imageUrls: imageUrls,
        available: values.availabilityStatus === "available",
        ownerId: ownerId, // Use the fetched owner ID
      };
  
      const response = await new BaseApiService(
        "/properties/list"
      ).postRequestWithJsonResponse(formattedValues);

      console.log("Property creation response:", response);
      
      message.success("Property created successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Submission error:", error);
      message.error(error.response?.message || "Error creating property");
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

    fetchCountries();
  }, []);

  return (
    <>
      <div style={{ padding: "4vh 2vw 3vh 2vw", width: "100%" }}>
        <h1>Add New Property</h1>
        <p>Here’s where you enter your property details.</p>
      </div>

      <div className="form-card">
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
                rules={[
                  { required: true, message: "Property Name is required!" },
                ]}
                style={{ marginBottom: 5 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Property Type"
                name="propertyType"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Select placeholder="Select Type">
                  <Option value="apartment">Apartment</Option>
                  <Option value="studio">Studio</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Availability Status"
                name="availabilityStatus"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Select placeholder="Select Status">
                  <Option value="AVAILABLE">Available</Option>
                  <Option value="OCCUPIED">Occupied</Option>
                  <Option value="RESERVED">Reserved</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Number of Bedrooms"
                name="bedrooms"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <InputNumber min={0} style={{ width: "100%" }} defaultValue={0}/>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Number of Bathrooms"
                name="bathrooms"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <InputNumber min={0} style={{ width: "100%" }} defaultValue={0}/>
              </Form.Item>
            </Col>

            

            <Col span={24}>
              <Form.Item
                label="Property Decription"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Talk about your property, briefly!",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please upload at least 1 image!",
                  },
                ]}
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: "#fdb10e" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </Form.Item>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
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
              <Form.Item
                label="Distance from City (km)"
                name="distanceFromCity"
                style={{ marginBottom: 10 }}
              >
                <InputNumber style={{width: "100%"}} defaultValue={0} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Distance from Campus (km)"
                name="distanceFromCampus"
                style={{ marginBottom: 10 }}
              >
                <InputNumber style={{width: "100%"}} defaultValue={0} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Address"
                name="address"
                style={{ marginBottom: 5 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Location Latitude"
                name="locationLat"
                style={{ marginBottom: 5 }}
              >
                <InputNumber style={{width: "100%"}} defaultValue={0} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Location Longitude"
                name="locationLong"
                style={{ marginBottom: 5 }}
              >
                <InputNumber style={{width: "100%"}} defaultValue={0} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: false }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="Select country"
                  style={{ height: 40, textAlign: "left" }}
                  showSearch // Enable search functionality
                  optionFilterProp="children" // Search against the children (country names)
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
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

          {/* Amenities Section */}
          <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
            Amenities
          </Title>
          <Divider />
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label="Furnishing Status"
                name="furnishingStatus"
                style={{ marginBottom: 10 }}
              >
                <Select placeholder="Select Status">
                  <Option value="furnished">Furnished</Option>
                  <Option value="unfurnished">Unfurnished</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Parking Status"
                name="parkingStatus"
                style={{ marginBottom: 10 }}
              >
                <Select placeholder="Select Status">
                  <Option value="available">Parking Available</Option>
                  <Option value="unavailable">No Parking Available</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Laundry Services"
                name="laundry"
                style={{ marginBottom: 10 }}
              >
                <Select placeholder="Select Status">
                  <Option value="available">Laundry Services Available</Option>
                  <Option value="unavailable">
                    Laundry Services Unavailable
                  </Option>
                </Select>
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
              <Form.Item
                label="Security Deposit"
                name="securityDeposit"
                rules={[{ required: true }]}
                style={{ marginBottom: 10 }}
              >
                <InputNumber addonBefore={selectBefore} style={{ width: "100%" }} defaultValue={0} min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Monthly Rent"
                name="monthlyRent"
                rules={[{ required: true }]}
                style={{ marginBottom: 10 }}
              >
                <InputNumber addonBefore={selectBefore} style={{ width: "100%" }} defaultValue={0} min={0} />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row justify="center" style={{ marginTop: 20 }} gutter={[50, 0]}>
            <Col span={12}>
              <Form.Item>
                {loading ? (
                  <Button
                    type="default"
                    block
                    style={{
                      height: 40,
                      backgroundColor: "#fdb10e",
                      color: "#fff",
                    }}
                  >
                    <LoadingOutlined spin />
                  </Button>
                ) : (
                  <Button
                    type="default"
                    // htmlType="submit"
                    onClick={onFinish}
                    block
                    style={{
                      height: 40,
                      backgroundColor: "#fdb10e",
                      color: "#fff",
                    }}
                  >
                    Add Property
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="reset"
                  block
                  style={{ height: 40 }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default PropertyForm;

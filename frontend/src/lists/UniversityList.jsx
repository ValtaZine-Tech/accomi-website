import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import "./styles.css";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useCallback, useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";

const { Option } = Select;
const { Title } = Typography;

const UniversityList = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    physicalAddress: "",
    emailAddress: "",
    postalAddress: "",
    phoneNumber: "",
    locationLat: 0,
    locationLng: 0,
    description: "",
    countryId: null,
  });

  const [institutions, setInstitutions] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [countries, setCountries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const fetchInstitutions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await new BaseApiService(
        "/institutions"
      ).getRequestWithJsonResponse({
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      });

      const institutionsData = response?.records || [];
      setInstitutions(institutionsData);
      setTotal(response?.totalItems || 0);
    } catch (error) {
      setError("Failed to retrieve institutions");
      console.error("Fetch institutions error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  useEffect(() => {
    const filteredValues = institutions.filter((value) => {
      if (!searchTerm) return true;
      const searchFields = [
        value.value?.toLowerCase() || "",
        value.type?.toLowerCase() || "",
      ];
      return searchFields.some((field) =>
        field.includes(searchTerm.toLowerCase())
      );
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedData(filteredValues.slice(startIndex, endIndex));
    setTotal(filteredValues.length);
  }, [institutions, searchTerm, currentPage, pageSize]);

  const onSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  const handleDelete = async (institutionId) => {
    try {
      await new BaseApiService(`/institutions/${institutionId}`).deleteRequest();
      message.success("University deleted successfully");
      await fetchInstitutions(); // Refetch updated data
    } catch (error) {
      setError(error.message);
      message.error("Failed to delete university");
    }
  };

  const columns = [
    {
      title: "University",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: [
        { text: "USA", value: "USA" },
        { text: "Canada", value: "Canada" },
        { text: "UK", value: "UK" },
        { text: "Germany", value: "Germany" },
      ],
      onFilter: (value, record) => record.country.indexOf(value) === 0,
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            aria-label="Approve"
            title="Approve"
            icon={<EditOutlined />}
            style={{
              border: "none",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              padding: "0",
              backgroundColor: "#d7e9f8",
              color: "#4fa6d9",
            }}
          />
          <Button
            aria-label="Delete"
            title="Delete"
            icon={<DeleteOutlined />}
            onClick={() => {
                setSelectedInstitution(record); // Set selected institution
                setModalOpen(true);
              }}
            style={{
              border: "none",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              padding: "0",
              backgroundColor: "#f8d7da",
              color: "#d9534f",
            }}
          />

<Modal
  title="Delete University"
  centered
  open={modalOpen}
  onOk={() => {
    handleDelete(selectedInstitution?.id);
    setModalOpen(false);
  }}
  onCancel={() => {
    setModalOpen(false);
    setSelectedInstitution(null);
  }}
>
  <p style={{ marginBottom: 10 }}>
    You are deleting{" "}
    <span style={{ fontWeight: 600 }}>{selectedInstitution?.name}</span> from your
    University list.
  </p>
  <p style={{ fontWeight: 600 }}>Caution</p>
  <p>
    This action is irreversible and will permanently delete the university from your list.
  </p>
</Modal>
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        locationLat: Number(values.locationLat),
        locationLng: Number(values.locationLng),
      };

      console.log("Submitting: ", payload);

      await new BaseApiService("/institutions").postRequestWithJsonResponse(
        payload
      );
      message.success("Institution created successfully!");
      form.resetFields();
      await fetchInstitutions();
    } catch (error) {
      console.error("Submission error:", error);
      message.error(
        error.response?.data?.message || "Error creating institution"
      );
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
      <div style={{ padding: "0 2vw 1rem 2vw", width: "100%" }}>
        <h1>Universities</h1>
        <p>Here’s where university details are recorded</p>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "0 2vw",
        }}
      >
        <div className="lookup-container">
          <div className="lookup-card">
            <Search
              placeholder="Search by value, category..."
              onSearch={onSearch}
              onChange={(e) => onSearch(e.target.value)}
              enterButton="Search"
              allowClear
              style={{ marginBottom: 30 }}
            />

            <Table
              columns={columns}
              dataSource={displayedData}
              loading={loading}
              onChange={(pagination) => {
                setCurrentPage(pagination.current);
                setPageSize(pagination.pageSize);
              }}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                // showTotal: (total) => `Total ${total} items`,
              }}
              locale={{
                emptyText: (
                  <div style={{ padding: 20 }}>
                    <p>No universities found</p>
                    {!loading && (
                      <Button
                        type="link"
                        onClick={fetchInstitutions}
                        style={{ paddingLeft: 0 }}
                      >
                        Try reloading data
                      </Button>
                    )}
                  </div>
                ),
              }}
            />

            {error && (
              <Alert
                message="Data Loading Error"
                description="We couldn't load the lookup values. Please try again later."
                type="error"
                closable
                onClose={() => setError(null)}
                style={{ marginBottom: 16 }}
              />
            )}
          </div>
          <div className="lookup-card">
            <Form
              form={form}
              name="property_form"
              layout="vertical"
              onFinish={onFinish}
            >
              {/* Property Details Section */}
              <Title level={4} style={{ marginBottom: 10 }}>
                University Details
              </Title>

              <Row gutter={[10, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="University Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Institution name is required",
                      },
                      {
                        max: 100,
                        message:
                          "Institution name must be less than 100 characters",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Email Address"
                    name="emailAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid email address",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emailAddress: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid phone number!",
                      },
                      {
                        max: 10,
                        message: "Phone number shouldn't exceed 10 digits.",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Country"
                    name="countryId"
                    rules={[{ required: true }]}
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="Select country"
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

                <Col span={12}>
                  <Form.Item
                    label="Physical Address"
                    name="physicalAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid physical address!",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Postal Address"
                    name="postalAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid postal address!",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      value={formData.postalAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          postalAddress: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Map Latitude"
                    name="locationLat"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid map latitude!",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="number"
                      value={formData.locationLat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          locationLat: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Map Longitude"
                    name="locationLng"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid map longitude!",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="number"
                      value={formData.locationLng}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          locationLng: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Decription"
                    name="description"
                    rules={[
                      {
                        max: 200,
                        message: "Description must be less than 200 characters",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input.TextArea
                      rows={5}
                      showCount
                      maxLength={200}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Submit Button */}
              <Row justify="center" style={{ marginTop: 20 }} gutter={[50, 0]}>
                <Col span={12}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ backgroundColor: "#fdb10e", height: 40 }}
                    >
                      Add University
                    </Button>
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
        </div>
      </div>
    </>
  );
};

export default UniversityList;

import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
} from "antd";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";


const { Option } = Select;

const LookupValues = () => {
  const [form] = Form.useForm();
  const [allValues, setAllValues] = useState([]);
  const [displayedValues, setDisplayedValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchLookupValues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await new BaseApiService(
        "/lookups/lookup-values"
      ).getRequestWithJsonResponse({ offset: 0, limit: 100 });

      const records = response?.records || [];
      const valuesArray = records.map((v) => ({
        key: v.id,
        id: v.id,
        value: v.value,
        type: v.type,
        abbreviation: v.abbreviation || "-",
        description: v.description || "-",
      }));

      setAllValues(valuesArray);
      setTotal(records.length);
    } catch (error) {
      setError("Failed to retrieve lookup values");
      console.error("Fetch lookup values error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLookupValues();
  }, [fetchLookupValues]);

  useEffect(() => {
    const filteredValues = allValues.filter((value) => {
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
    setDisplayedValues(filteredValues.slice(startIndex, endIndex));
    setTotal(filteredValues.length);
  }, [allValues, searchTerm, currentPage, pageSize]);

  const onSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  const columns = [
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        type: values.type,
        value: values.value,
        abbreviation: values.abbreviation,
        description: values.description,
      };

      // const response = await new BaseApiService(
      //   "/lookups/lookup-values"
      // ).postRequestWithJsonResponse(formattedValues);
      // console.log("Submission successful:", response);

      await new BaseApiService(
        "/lookups/lookup-values"
      ).postRequestWithJsonResponse(formattedValues);

      message.success("Lookup Value created successfully!");
      form.resetFields();
      await fetchLookupValues();
    } catch (error) {
      console.error("Submission error:", error);

      const userMessage = error.response?.data?.message
        ? "Validation Error: Please check your input values"
        : "Network Error: Couldn't reach the server. Check your connection.";

      message.error(userMessage);
    }
  };

  const valueTypes = [
    { id: 0, value: "AMENITY", name: "Amenity" },
    { id: 1, value: "BUDGET", name: "Budget" },
    { id: 2, value: "CURRENCY", name: "Currency" },
    { id: 3, value: "COUNTRY_CODE", name: "Country Code" },
    { id: 4, value: "PROPERTY_TYPES", name: "Property Type" },
  ];

  return (
    <>
      <div style={{ padding: "0 2vw 1rem 2vw", width: "100%" }}>
        <h1>Lookup Values</h1>
        <p>Here’s where lookup values are recorded</p>
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
              dataSource={displayedValues}
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
                    <p>No lookup values found</p>
                    {!loading && (
                      <Button
                        type="link"
                        onClick={fetchLookupValues}
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
                Lookup Value Details
              </Title>

              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="Value"
                    name="value"
                    rules={[
                      {
                        required: true,
                        message: "Value name is required",
                      },
                      {
                        max: 50,
                        message: "Value name must be less than 50 characters",
                      },
                    ]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Abbreviation"
                    name="abbreviation"
                    rules={[{ required: false }]}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Category"
                    name="type"
                    rules={[{ required: true }]}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder="Select a Category">
                      {valueTypes.map((cat) => (
                        <Option key={cat.id} value={cat.value}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
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
                    <Input.TextArea rows={5} showCount maxLength={200} />
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
                      Save Value
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

export default LookupValues;

import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Image, Modal, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";
import { BaseApiService } from "../utils/BaseApiService";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const ownerDetails = UserSessionUtils.getOwnerDetails();

  const ownerId = ownerDetails?.id;

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    const searchParameters = {
      offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      ...(ownerId && { ownerId }),
    };
    new BaseApiService("/properties")
      .getRequestWithJsonResponse(searchParameters)
      .then((response) => {
        setProperties(response.map((prop) => ({ ...prop, key: prop.id })));
      })
      .catch((error) => {
        setError(error.message || "Failed to fetch properties");
        console.error("Fetch properties error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ownerId, currentPage, pageSize]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const filteredValues = properties.filter((property) => {
      if (!searchTerm) return true;

      const searchFields = [
        property.propertyName?.toLowerCase(),
        property.type?.toLowerCase(),
        property.address?.toLowerCase(),
        property.countryName?.toLowerCase(),
        property.availabilityStatus?.toLowerCase(),
      ];

      return searchFields.some((field) =>
        field?.includes(searchTerm.toLowerCase())
      );
    });

    const startIndex = 0;
    const endIndex = startIndex + pageSize;
    setCurrentPage(1);

    setDisplayedData(filteredValues.slice(startIndex, endIndex));
    setTotal(filteredValues.length);
  }, [properties, searchTerm, pageSize]);

  const handleDelete = async (propertyId) => {
    try {
      await new BaseApiService(`/properties/${propertyId}`).deleteRequest();
      setProperties((prev) => prev.filter((prop) => prop.id !== propertyId));
    } catch (error) {
      setError(error.message);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images) => (
        <Image
          width={50}
          height={50}
          src={
            images?.[0]?.path
              ? `http://localhost:8080${images[0].path}`
              : images.defaultProperty
          }
          alt="Property"
          onError={(e) => {
            e.target.src = images.defaultProperty;
            e.target.alt = "Fallback property image";
          }}
          style={{ borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <a>{record.propertyName}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Hotel", value: "Hotel" },
        { text: "Hostel", value: "Hostel" },
        { text: "Apartment", value: "Apartment" },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Country",
      dataIndex: "countryName",
      key: "country",
      // filters: [
      //     { text: 'USA', value: 'USA' },
      //     { text: 'Canada', value: 'Canada' },
      //     { text: 'UK', value: 'UK' },
      //     { text: 'Germany', value: 'Germany' },
      // ],
      // onFilter: (value, record) => record.country.indexOf(value) === 0,
      // sorter: (a, b) => a.country.localeCompare(b.country),
      // sortDirections: ['ascend', 'descend'],
    },
    {
      title: "Availability",
      key: "availabilityStatus",
      dataIndex: "availabilityStatus",
      render: (_, record) => (
        <Tag color={record.status === "AVAILABLE" ? "green" : "volcano"}>
          {record.recordStatus.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            aria-label="Edit Property"
            title="Edit Property"
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
            aria-label="Delete Property"
            title="Delete Property"
            icon={<DeleteOutlined />}
            onClick={() => setModalOpen(true)}
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
            title="Delete Property"
            centered
            open={modalOpen}
            onOk={() => handleDelete(record.id)}
            onCancel={() => setModalOpen(false)}
          >
            <p style={{ marginBottom: 10 }}>
              You are deleting{" "}
              <span style={{ fontWeight: 600 }}>{record.propertyName}</span>{" "}
              from your property list.
            </p>
            <p style={{ fontWeight: 600 }}>Caution</p>
            <p>
              This action is irreversible and will permanently delete the
              property from your list. Do you wish to proceed?
            </p>
          </Modal>
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <div style={{ paddingBottom: "2rem", width: "100%" }}>
          <h1>Properties</h1>
          <p>Here’s where properties are recorded and listed</p>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 16 }}>Error: {error}</div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 200,
            marginBottom: 30,
          }}
        >
          <Search
            placeholder="search property..."
            onSearch={onSearch}
            enterButton
            allowClear
          />
          <Link to="add-new">
            <Button
              type="primary"
              style={{
                padding: "0 30px",
                marginRight: 20,
                backgroundColor: "#111241",
                height: 40,
              }}
            >
              {" "}
              <PlusOutlined /> Add New Property{" "}
            </Button>
          </Link>
        </div>
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
                <p>No properties found</p>
                {!loading && (
                  <Button
                    type="link"
                    onClick={fetchProperties}
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
            description="We couldn't load the properties. Please try again later."
            type="error"
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}
      </div>
    </>
  );
};

export default PropertyList;

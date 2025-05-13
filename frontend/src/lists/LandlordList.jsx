// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Space, Table, Tag } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { BaseApiService } from "../utils/BaseApiService";

const LandlordList = () => {
  const [landlords, setLandlords] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchLandlords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await new BaseApiService(
        "/property-owners"
      ).getRequestWithJsonResponse({
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      });
      // console.log('Raw API Response:', response);

      const landlordsArray = Object.values(response).map((owner) => ({
        key: owner.id,
        id: owner.id,
        name: `${owner.user.firstName} ${owner.user.lastName}`,
        email: owner.user.primaryEmail,
        contact: owner.user.primaryPhone,
        username: owner.user.userName,
        countryName: owner.user.countryName,
        status: owner.recordStatus,
        roles: owner.user.roles.map((role) => role.name),
        dateCreated: owner.dateCreated,
      }));

      setLandlords(landlordsArray);
      setTotal(response?.totalItems || 0);
    } catch (error) {
      setError(error.message || "Failed to fetch property owners");
      console.error("Fetch property owners error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchLandlords();
  }, [fetchLandlords]);

  useEffect(() => {
    const filteredValues = landlords.filter((landlord) => {
      if (!searchTerm) return true;
      
      const searchFields = [
        landlord.name?.toLowerCase(),
        landlord.email?.toLowerCase(),
        landlord.contact?.toLowerCase(),
        landlord.countryName?.toLowerCase(),
        landlord.username?.toLowerCase(),
        landlord.roles?.join(' ')?.toLowerCase(),
        new Date(landlord.dateCreated).toLocaleDateString()?.toLowerCase()
      ];
  
      return searchFields.some(field => 
        field?.includes(searchTerm.toLowerCase())
      );
    });
  
    const startIndex = 0; 
    const endIndex = startIndex + pageSize;
    setCurrentPage(1);
    
    setDisplayedData(filteredValues.slice(startIndex, endIndex));
    setTotal(filteredValues.length);
  }, [landlords, searchTerm, pageSize]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Country",
      dataIndex: "countryName",
      key: "countryName",
      sorter: (a, b) => a.countryName.localeCompare(b.countryName),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.status === "ACTIVE" ? "green" : "volcano"}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="large">
          <Button
            aria-label="Approve Account"
            title="Approve Account"
            icon={<CheckOutlined />}
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
            aria-label="Revert Account"
            title="Revert Account"
            icon={<InfoCircleOutlined />}
            style={{
              border: "none",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              padding: "0",
              backgroundColor: "#f8e4d7",
              color: "#d9a94f",
            }}
          />
          <Button
            aria-label="Reject Account"
            title="Reject Account"
            icon={<CloseOutlined />}
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
          <h1>Landlord Accounts</h1>
          <p>Here’s where landlord details are listed</p>
        </div>

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
            placeholder="Search by name, email, country..."
            onSearch={onSearch}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} // Update search term as user types
            enterButton
            allowClear
            value={searchTerm}
          />
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
                <p>No landlords found</p>
                {!loading && (
                  <Button
                    type="link"
                    onClick={fetchLandlords}
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
            description="We couldn't load the landlord profiles. Please try again later."
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

export default LandlordList;

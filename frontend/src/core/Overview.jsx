/* eslint-disable no-unused-vars */
import Chart, { Colors } from "chart.js/auto";
import "./styles.css";
// import '../components/Charts'
import {
  Button,
  Checkbox,
  Divider,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { BaseApiService } from "../utils/BaseApiService";
import LineChart from "../charts/LineChart";
import MiniChartBar from "../charts/MiniChartBar";
import MiniChartLine from "../charts/MiniChartLine";
import MiniChartPie from "../charts/MiniChartPie";
import MiniChartHalfPie from "../charts/MiniChartHalfPie";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Overview = () => {
  const [reviews, setReviews] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await new BaseApiService(
        "/properties"
      ).getRequestWithJsonResponse({ offset: 0, limit: 100 });
      //   console.log('Raw API Response:', response);

      // Convert object response to array and transform data
      const propertiesArray = Object.values(response).map((property) => ({
        key: property.id,
        id: property.id,
        name: property.propertyName,
        email: property.user.primaryEmail,
        contact: property.user.primaryPhone,
        username: property.user.userName,
        countryName: property.user.countryName,
        status: property.recordStatus,
        roles: property.user.roles.map((role) => role.name),
        dateCreated: property.dateCreated,
      }));

      setReviews(propertiesArray);
      // console.log('Fetched landlords:', landlords);
    } catch (error) {
      setError(error.message || "Failed to fetch property owners");
      console.error("Fetch property owners error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const onSearch = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  const filteredReviews = reviews.filter((review) => {
    if (!searchTerm) return true;

    const searchFields = [
      review.propertyName,
      review.propertyType,
      review.propertyAddress,
      review.roles?.join(" "), // Search in roles array
      new Date(review.dateCreated).toLocaleDateString(), // Search in formatted date
    ];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );
  });

  const columns = [
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Student",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rating",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Review",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Status",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Time",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button
            aria-label="Approve Review"
            title="Approve Review"
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
            aria-label="Deny Review"
            title="Deny Review"
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

  const filteredRevenue = revenues.filter((revenue) => {
    if (!searchTerm) return true;

    const searchFields = [
      revenue.propertyName,
      revenue.propertyType,
      revenue.propertyAddress,
      revenue.roles?.join(" "), // Search in roles array
      new Date(revenue.dateCreated).toLocaleDateString(), // Search in formatted date
    ];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );
  });

  const columns2 = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.name.localeCompare(b.country),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Transactions",
      dataIndex: "transactions",
      key: "transactions",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Conv. Rate",
      dataIndex: "rate",
      key: "rate",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      enable: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <div style={{ padding: "0 2vw 1rem 2vw", width: "100%" }}>
        <h1>Overview</h1>
        <p>Here’s what’s going on at accomi right now</p>
      </div>

      <div className="top-section">
        <div className="top-section">
          {/* Total Properties Card */}
          <div className="ov-card">
            <h3>
              Total <br /> Properties
            </h3>
            <h1>{reviews.length}</h1>
            <div className="card-icon"></div>
            <div className="card-side-design">
              <div className="card-side-design-inner"></div>
            </div>
          </div>

          {/* Active Listings Card */}
          <div className="ov-card">
            <h3>
              Available <br /> Properties
            </h3>
            <h1>{reviews.filter((p) => p.status === "Active").length}</h1>
            <div className="card-icon"></div>
            <div className="card-side-design">
              <div className="card-side-design-inner"></div>
            </div>
          </div>

          {/* Registered Landlords Card */}
          <div className="ov-card">
            <h3>
              Landlord <br /> Accounts
            </h3>
            <h1>{new Set(reviews.map((p) => p.email)).size}</h1>
            <div className="user-avatars">
              {reviews.slice(0, 3).map((review, index) => (
                <span key={index} className="avatar">
                  {review.username[0]}
                </span>
              ))}
            </div>
            <div className="card-icon"></div>
            <div className="card-side-design">
              <div className="card-side-design-inner"></div>
            </div>
          </div>

          {/* Top Country Card */}
          <div className="ov-card">
            <h3>
              Top <br /> Country
            </h3>
            <h1>
              {Object.entries(
                reviews.reduce((acc, curr) => {
                  acc[curr.countryName] = (acc[curr.countryName] || 0) + 1;
                  return acc;
                }, {})
              ).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0])[0] || "N/A"}
            </h1>
            <div className="card-icon"></div>
            <div className="card-side-design">
              <div className="card-side-design-inner"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Total Transactions</h2>
            <p>Payment received across all channels</p>
          </div>
          <Select
            style={{ width: "300px", height: "40px" }}
            placeholder="Select a Timeframe (years)"
          >
            <Select.Option value="2025">2025</Select.Option>
            <Select.Option value="2024">2024</Select.Option>
            <Select.Option value="2022">2022</Select.Option>
            <Select.Option value="2021">2021</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
          </Select>
        </div>

        <div className="main-chart">
          <LineChart />
        </div>

        <div className="chart-card-container">
          <div className="chart-card">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>Total payments</h3>
                <p>Last 7 days</p>
              </div>
              <h1>0</h1>
            </div>

            <div className="mini-chart">
              <MiniChartBar
                type="bar"
                data={[25, 30, 20, 35, 22, 38, 26]}
                color="#2c7be5"
              />
            </div>
          </div>

          <div className="chart-card">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>New users</h3>
                <p>Last 7 days</p>
              </div>
              <h1>0</h1>
            </div>

            <div className="mini-chart">
              <MiniChartLine
                type="line"
                data={[25, 30, 5, 35, 15, 38, 20]}
                color="#2c7be5"
              />
            </div>
          </div>

          <div className="chart-card">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>Top properties</h3>
                <p>Last 7 days</p>
              </div>
              <h1>0</h1>
            </div>

            <div className="mini-chart">
              <MiniChartPie
                type="pie"
                data={[25, 30, 20, 35, 22, 38, 26]}
                color="#2c7be5"
              />
            </div>
          </div>

          <div className="chart-card">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>Paying vs non paying</h3>
                <p>Last 7 days</p>
              </div>
              <h1>0</h1>
            </div>

            <div className="mini-chart">
              <MiniChartHalfPie type="pie" data={[100, 250]} color="#2c7be5" />
            </div>
          </div>
        </div>

        <div className="review-container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <div>
              <h2>Latest Reviews</h2>
              <p>Latest reviews from students</p>
            </div>

            <div>
              <Search
                placeholder="Search by property name..."
                onSearch={onSearch}
                onChange={(e) => onSearch(e.target.value)}
                enterButton="Search"
                allowClear
                style={{ width: 300, height: 40 }}
              />
            </div>
          </div>

          <Table
            rowSelection={Object.assign({ type: Checkbox }, rowSelection)}
            columns={columns}
            dataSource={filteredReviews}
            loading={loading}
            onChange={onChange}
          />
        </div>

        <div className="revenue-container">
          <div>
            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <h2>Top regions by revenue</h2>
              <p>Where most of the revenue was generated</p>
            </div>

            <Table
              columns={columns2}
              dataSource={filteredRevenue}
              loading={loading}
              onChange={onChange}
            />
          </div>

          <div className="revenue-map"></div>
        </div>

        <div className="earnings-container">
          <div className="earnings-chart">
            <div>
              <h2>Projection vs actual</h2>
              <p>Projected earnings vs actual earnings</p>
            </div>
            <MiniChartBar
              type="bar"
              data={[[25, 30, 20, 35, 22, 38, 26],[25, 30, 20, 35, 22, 38, 26]]}
              color="#2c7be5"
            />
          </div>

          <div className="user-return-chart">
            <div>
              <h2>Returning user rate</h2>
              <p>Rate of users returning to accomi over time</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

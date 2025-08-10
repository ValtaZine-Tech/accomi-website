import { Avatar, Tabs } from "antd";
import Footer from "../partials/Footer";
import Navbar from "../partials/Navbar";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import { useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";

const ProfilePageStudent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Create a proper API service instance
        const apiService = new BaseApiService("/users");

        // Execute the request properly
        const response = await apiService.getRequestWithJsonResponse({
          // Send as query parameters
          offset: 0,
          limit: 1000,
        });

        console.log("All users response:", response);

        // Get current user ID from session
        const currentUserId = UserSessionUtils.getUserDetails()?.id;

        // Find matching user - verify response structure
        const foundUser = response.data.find(
          (user) => user.id === currentUserId
        );
        console.log("Found user:", foundUser);

        if (foundUser) {
          setUserData(foundUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Personal Information",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Preferences",
      children: "Content of Tab Pane 3",
    },
    {
      key: "3",
      label: "Transaction History",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "My Whishlist",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div style={{ paddingBottom: "2rem", width: "100%" }}>
          <h1>My Profile</h1>
          <p>Here’s where all information about you can be accessed.</p>
        </div>

        <div className="profile-card-container">
          <div className="profile-card">
            <div>
              <div className="profile-card-image">
                <Avatar
                  style={{
                    verticalAlign: "middle",
                    backgroundColor: "#ffbf00",
                    color: "#fff",
                    fontSize: "5rem",
                  }}
                  size={160}
                >
                  {userData?.fullName?.charAt(0) || "U"}
                </Avatar>
              </div>
              <div>
                <h1 style={{ margin: 0, fontWeight: 500 }}>
                  {userData?.fullName || "User"}
                </h1>
                <p style={{ margin: 0 }}>
                  {userData?.userName || "Not Available"}
                </p>
                <p style={{ margin: 0 }}>
                  {userData?.primaryEmail || "Not Available"}
                </p>
              </div>
            </div>
          </div>
          <div className="profile-card">
            <h1>Default Address</h1>
            <p>Address</p>
            <span>
              <p>
                {userData?.address?.street || "Street address not available"}
              </p>
            </span>
            <span>
              <p>
                {userData?.address?.city || "City information not available"}
              </p>
            </span>
            <p>Email</p>
            <span>
              <p>{userData?.primaryEmail || "Email address not available"}</p>
            </span>
            <p>Phone</p>
            <span>
              <p>{userData?.phone || "Phone number not available"}</p>
            </span>
          </div>
        </div>

        <div className="profile-tabs">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePageStudent;

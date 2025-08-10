/* eslint-disable no-unused-vars */
import { Button, Carousel, ConfigProvider, Select, Skeleton } from "antd";
import { asset, images } from "../assets/assets";
import { GoogleMapsWrapper } from "../utils/GoogleMapUtils";
import GoogleMapWithMarkers from "../utils/ReactMap";
import { SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const fetchProperties = useCallback(async () => {
    const searchParameters = { offset: 0, limit: 100 };
    try {
      setLoading(true);
      const response = await new BaseApiService(
        "/properties"
      ).getRequestWithJsonResponse(searchParameters);
      // console.log("API Response:", response);
      setProperties(response);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    new BaseApiService("/map-controller/properties")
      .getRequestWithJsonResponse()
      .then((response) => {
        setLocations(response?.records);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchProperties(), fetchLocations()]);
      } catch (error) {
        setError(error.message);
      }
    };
    loadData();
  }, [fetchProperties, fetchLocations]);

  const renderPropertySkeletons = () => {
    return Array(4)
      .fill()
      .map((_, index) => (
        <div className="ppty-card" key={`skeleton-${index}`}>
          <div className="ppty-card-image">
            <Skeleton.Image
              active
              style={{
                width: "22vw",
                height: "250px",
                borderRadius: "8px 8px 0 0",
              }}
            />
          </div>
          <div style={{ padding: "0.5rem 1rem 0.7rem 1rem" }}>
            <Skeleton
              active
              paragraph={{
                rows: 4,
                width: ["100%", "100%", "100%", "60%"],
              }}
              title={false}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "1rem",
              }}
            >
              <Skeleton.Button active size="large" style={{ width: "100px" }} />
              <Skeleton.Input active size="small" style={{ width: "80px" }} />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorBorder: "#ffffff",
              colorPrimary: "#fdb10e",
              hoverBorderColor: "#fdb10e",
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            Button: {
              colorPrimary: "#fdb10e",
              borderRadius: 6,
              height: 40,
              width: "10rem",
              border: "none",
              fontSize: "15px",
            },
            Carousel: {
              dotActiveColor: "#fdb10e",
              dotColor: "#ffffff",
              dotSize: "10px",
            },
          },
        }}
      >
        <>
          <header className="header-container">
            <div className="header-card header-ppt-card">
              <h1>
                Redefining <span style={{ color: "#fdb10e" }}>Student</span>{" "}
                <span className="header-ppt-card-title-ending1">Accommodation.</span><span className="header-ppt-card-title-ending2">Living.</span>
              </h1>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <img
                    src={asset.hSearch}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div>
                  <p>Personalized Recommendations based on your preferences.</p>
                  <p style={{ fontSize: "14px", fontWeight: "300" }}>
                    {" "}
                    <i className="fa-solid fa-zap"></i> Takes less than 60
                    seconds
                  </p>
                </div>
              </div>
            </div>

            <div className="header-socials">
              <div className="filler"></div>

              <div>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>

                <a
                  href="https://www.instagram.com/accomi.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>

                <a
                  href="https://www.tiktok.com/@accomi.ae?_t=ZM-8t3WgCSOqoP&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>

              <div className="filler"></div>
            </div>

            <div className="header-overlay"></div>

            <div className="header-background">
              <LazyLoadImage
                effect="blur"
                style={{ objectPosition: "center", width: "100vw" }}
                src={images.poBG}
                alt="Header background image"
                loading="lazy"
              />
            </div>
          </header>

          {/* <section style={{ padding: "5vh 0", margin: "0" }}>
            <div className="header-property-search">
              <div className="property-search-inputs">
                <Select
                  placeholder="Location"
                  style={{ width: "18vw", height: "40px" }}
                  allowClear
                >
                </Select>
                <Select
                  placeholder="Property Type"
                  style={{ width: "18vw", height: "40px" }}
                  allowClear
                >
                </Select>
                <Select
                  placeholder="Room Type"
                  style={{ width: "18vw", height: "40px" }}
                  allowClear
                
                </Select>
                <Select
                  placeholder="Budget"
                  style={{ width: "18vw", height: "40px" }}
                  allowClear
                >
                </Select>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{
                    background: "#fdb10e",
                    height: "40px",
                    width: "10rem",
                    borderRadius: 6,
                    border: "none",
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </section> */}

          <section style={{ padding: "0 0 5vh 0", margin: "0 3vw" }}>
            <h1 style={{ fontWeight: 500, marginBottom: "20px" }}>
              Listed Properties
            </h1>
            <div className="ppty-card-container">
              {loading
                ? renderPropertySkeletons()
                : properties.map((property) => (
                    <div className="ppty-card" key={property.id}>
                      <div className="ppty-card-image">
                        <Carousel
                          dots={true}
                          infinite={false}
                          effect="fade"
                          draggable
                        >
                          {property.images.map((image, imgIndex) => {
                            return (
                              <div className="ppty-image" key={imgIndex}>
                                <LazyLoadImage
                                  src={`http://localhost:8080${image?.path}`}
                                  alt={`${property.propertyName} - Image ${
                                    imgIndex + 1
                                  }`}
                                  onError={(e) => {
                                    console.log(
                                      "Image failed to load:",
                                      e.target.src
                                    );
                                    e.target.src = images.defaultProperty;
                                    e.target.alt = "Fallback property image";
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="image-count-tag">
                                  <i
                                    className="fa-regular fa-image"
                                    style={{ color: "#ffffff" }}
                                  ></i>
                                  <p
                                    style={{
                                      color: "#ffffff",
                                      lineHeight: 0,
                                    }}
                                  >
                                    {property.images.length}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </Carousel>
                        <div
                          className="availability-tag"
                          style={{
                            background:
                              property.availabilityStatus === "available"
                                ? "#fdb10e"
                                : "#111143",
                          }}
                        >
                          <p>
                            {property.availabilityStatus === "available"
                              ? "Available"
                              : "Occupied"}
                          </p>
                        </div>
                      </div>
                      <div style={{ padding: "0.5rem 1rem 0.7rem 1rem" }}>
                        <Link
                          to={`${property.id}`}
                          onClick={() => window.scroll(0, 0)}
                          state={{ name: property.PropertyName }}
                        >
                          <h3>{property.propertyName}</h3>
                        </Link>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: ".5rem",
                          }}
                        >
                          <div
                            className="property-info"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <i
                              className="fa-solid fa-building"
                              style={{ color: "#fdb10e" }}
                            ></i>
                            <p>{property.propertyType || "Apartment"}</p>
                          </div>
                          <div
                            className="property-info"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <i
                              className="fa-solid fa-location-dot"
                              style={{ color: "#fdb10e" }}
                            ></i>
                            <p>{truncateText(property.address, 13)}</p>
                          </div>
                        </div>
                        <p style={{ marginBottom: ".5rem" }}>
                          {truncateText(property.description || "", 200)}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <h3>
                            UGX {property.price?.toLocaleString() ?? "..."}
                          </h3>
                          <p>per month</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          <section style={{ padding: "5vh 0", margin: "0" }}>
            <div className="map-container">
              <GoogleMapsWrapper>
                <GoogleMapWithMarkers
                  key={"test"}
                  mapId="map_id"
                  className={"test"}
                  locations={locations}
                />
              </GoogleMapsWrapper>
            </div>
          </section>
        </>
      </ConfigProvider>
    </>
  );
};

export default PropertyListings;

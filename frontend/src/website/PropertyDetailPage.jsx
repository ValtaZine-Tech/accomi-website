/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import {
  Button,
  Card,
  Carousel,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Skeleton,
  Steps,
} from "antd";
import { asset, images } from "../assets/assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BaseApiService } from "../utils/BaseApiService";
import { GoogleMapsWrapper } from "../utils/GoogleMapUtils";
import GoogleMapWithMarkers from "../utils/ReactMap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { InfoCircleOutlined } from "@ant-design/icons";

const PropertyDetailPage = () => {
  const { id, propertyName } = useParams();
  const [propertyDetail, setPropertyDetail] = useState(null); // Changed to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const monthFormat = "MM/YY";

  // Add these new functions
  const handleReserveNow = () => {
    setIsPaymentModalVisible(true);
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      try {
        await form.validateFields();
      } catch (error) {
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePaymentConfirmation = () => {
    const values = form.getFieldsValue();
    console.log("Payment confirmed:", values);
    message.success("Payment processed successfully!");
    setIsPaymentModalVisible(false);
    setCurrentStep(0);
    setSelectedPaymentMethod("");
    form.resetFields();
  };

  const paymentMethods = [
    "Credit/Debit Card",
    "MTN Mobile Money",
    "Airtel Money",
    "PayPal",
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await new BaseApiService(
          `/properties/${id}`
        ).getRequestWithJsonResponse();
        console.log("Property images:", response.images);
        console.log("Property Detail: ", response);

        setPropertyDetail({
          ...response,
          images: response?.images || [] // Fallback to empty array
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const DetailPageSkeleton = () => (
    <>
      <div className="main-content">
        <Skeleton.Image
          active
          style={{ width: "800px", height: "500px", borderRadius: "8px" }}
        />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
      <div className="sidebar-contact">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    </>
  );

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
            Input: {
              colorPrimary: "#fdb10e",
              hoverBorderColor: "#fdb10e",
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            DatePicker: {
              colorPrimary: "#fdb10e",
              hoverBorderColor: "#fdb10e",
              borderRadius: 6,
              controlHeight: 40,
              fontSize: 15,
              paddingInline: 10,
              fontSizeIcon: 16,
            },
            Steps: {
              colorPrimary: "#fdb10e",
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
            Form: {
              labelColor: '#666666'
            },
          },
        }}
      >
        <Breadcrumbs className="breadcrumb" />
        <div className="property-detail-container">
          {/* Main Content Section */}
          {loading ? (
            <DetailPageSkeleton />
          ) : propertyDetail ? (
            <>
              <div className="main-content">
                {/* Image Gallery */}
                <div className="detail-card-1">
                  <div className="image-gallery">
                    <div className="main-image">
                      <Carousel
                        dots={true}
                        infinite={false}
                        effect="fade"
                        draggable
                      >
                        {propertyDetail.images?.length > 0 ? (
                          propertyDetail.images?.map((image, imgIndex) => (
                            <div key={imgIndex}>
                              <LazyLoadImage
                                src={`http://localhost:8080${image?.path}`}
                                alt={`${propertyDetail.propertyName} - Image ${
                                  imgIndex + 1
                                }`}
                                onError={(e) => {
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
                                />
                                <p style={{ color: "#ffffff", lineHeight: 0 }}>
                                  {propertyDetail.images?.length || 0}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="main-image">
                            <LazyLoadImage
                              src={images.defaultProperty}
                              alt="No images available"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </Carousel>
                      <div
                        className="availability-tag"
                        style={{
                          background:
                            propertyDetail.availabilityStatus === "AVAILABLE"
                              ? "#fdb10e"
                              : "#111143",
                        }}
                      >
                        <p>
                          {propertyDetail.availabilityStatus === "AVAILABLE"
                            ? "Available"
                            : "Occupied"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Property Highlights */}
                  <div className="property-highlights">
                    <h2
                      style={{
                        marginBottom: 10,
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      {propertyDetail.propertyName}
                    </h2>
                    <p>{propertyDetail.address}</p>
                  </div>

                  <div
                    className="description-section"
                    style={{ marginTop: ".8rem" }}
                  >
                    <p>
                      {propertyDetail.description || "No description available"}
                    </p>
                  </div>

                  <div className="spec-grid">
                    <div className="spec-item">
                      <span className="spec-label">Bedrooms</span>
                      <span className="spec-value">
                        {propertyDetail.bedrooms}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Bathrooms</span>
                      <span className="spec-value">
                        {propertyDetail.bathrooms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities Section */}
                <div className="detail-card-1">
                  <div className="amenities-section">
                    <h2
                      style={{
                        marginBottom: 16,
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      Facilities in {propertyDetail.propertyName}
                    </h2>
                    <div className="amenities-grid">
                      {propertyDetail.amenities?.length > 0 ? (
                        propertyDetail.amenities.map((amenity) => (
                          <div key={amenity.id} className="amenity-item">
                            {amenity.value}
                          </div>
                        ))
                      ) : (
                        <div className="no-amenities">No amenities listed</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="detail-card-1">
                  <h2
                    style={{
                      marginBottom: 16,
                      fontSize: "24px",
                      fontWeight: 600,
                    }}
                  >
                    Payments
                  </h2>
                  <p
                    style={{
                      marginBottom: 10,
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Deposit:</span> $3 to
                    confirm your booking(Pay the outstanding balance 4 weeks
                    prior to arrival and receive your confirmation letter)
                  </p>
                  <p
                    style={{
                      marginBottom: 10,
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Installment Plan:</span>{" "}
                    37 weeks or above – up to 4 installments, less than 37 weeks
                    – 1 installment Guarantor: No Guarantor required.{" "}
                  </p>
                  <p
                    style={{
                      marginBottom: 10,
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Mode of Payment:</span>{" "}
                    Credit/Debit Card or online payment.
                  </p>

                  <div className="payment-image-logos">
                    <img src={asset.visacard} alt="visa logo" />
                    <img src={asset.master} alt="debit logo" />
                    <img src={asset.mtn} alt="mtn money logo" />
                    <img src={asset.airtel} alt="airtel money logo" />
                    <img src={asset.paypal} alt="paypal logo" />
                  </div>
                </div>
              </div>

              {/* Contact Sidebar */}
              <div className="sidebar-card">
                <div className="booking-box">
                  <p style={{ fontSize: "18px" }}>
                    From{" "}
                    <span style={{ fontWeight: 600, fontSize: "24px" }}>
                      {propertyDetail.unit}.{propertyDetail.price}
                    </span>{" "}
                    / month
                  </p>
                  <p
                    style={{
                      color: "#6e6e6e",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    Fill the form below and discover comfortable living spaces
                    near your campus.
                  </p>
                  <button className="booking-button" onClick={handleReserveNow}>
                    <span style={{ fontSize: "14px" }}>Reserve Now</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>Property not found</div>
          )}
        </div>

        <Modal
          title="Complete Payment"
          visible={isPaymentModalVisible}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
          onCancel={() => {
            setIsPaymentModalVisible(false);
            setCurrentStep(0);
            setSelectedPaymentMethod("");
            form.resetFields();
          }}
          footer={[
            currentStep > 0 && (
              <Button
                key="back"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
            ),
            currentStep === 1 && (
              <Button key="next" type="primary" onClick={handleNextStep}>
                Next
              </Button>
            ),
            currentStep === 2 && (
              <Button
                key="submit"
                type="primary"
                onClick={handlePaymentConfirmation}
              >
                Confirm Payment
              </Button>
            ),
          ]}
        >
          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            <Steps.Step title="Choose Payment" />
            <Steps.Step title="Fill Info" />
            <Steps.Step title="Confirm" />
          </Steps>

          <div className="steps-content">
            {currentStep === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {paymentMethods.map((method) => (
                  <Card
                    key={method}
                    hoverable
                    onClick={() => {
                      setSelectedPaymentMethod(method);
                      setCurrentStep(1);
                    }}
                    style={{
                      width: "180px",
                      height: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "center",
                      marginBottom: 16,
                      borderColor:
                        selectedPaymentMethod === method
                          ? "#fdb10e"
                          : "#d9d9d9",
                    }}
                  >
                    {method}
                  </Card>
                ))}
              </div>
            )}

            <div style={{maxWidth: "80%", margin: "0 auto"}}>
              {currentStep === 1 && (
                <Form
                  form={form}
                  layout="vertical"
                  variant={variant || "filled"}
                  requiredMark={false}
                >
                  {selectedPaymentMethod === "Credit/Debit Card" && (
                    <>
                      <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your card number",
                            max: 16,
                            len: 16,
                          },
                        ]}
                      >
                        <Input
                          placeholder="1234 5678 9012 3456"
                          maxLength={16}
                        />
                      </Form.Item>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="expiry"
                            label="Expiry Date"
                            rules={[
                              {
                                required: true,
                                message: "Please select expiry date",
                              },
                            ]}
                          >
                            <DatePicker
                              format={monthFormat}
                              picker="month"
                              placeholder="MM/YY"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="cvv"
                            label="CVV"
                            tooltip={{
                              title:
                                "The three digit number at the back of your Card.",
                              icon: <InfoCircleOutlined />,
                            }}
                            rules={[
                              { required: true, message: "Please enter CVV" },
                            ]}
                          >
                            <Input placeholder="123" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        name="name"
                        label="Cardholder Name"
                        rules={[
                          { required: true, message: "Please enter your name" },
                        ]}
                      >
                        <Input placeholder="John Doe" />
                      </Form.Item>
                    </>
                  )}

                  {(selectedPaymentMethod === "MTN Mobile Money" ||
                    selectedPaymentMethod === "Airtel Money") && (
                    <Form.Item
                      name="phoneNumber"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input placeholder="+1234567890" />
                    </Form.Item>
                  )}

                  {selectedPaymentMethod === "PayPal" && (
                    <Form.Item
                      name="email"
                      label="PayPal Email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your PayPal email",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="example@paypal.com" />
                    </Form.Item>
                  )}
                </Form>
              )}
            </div>

            {currentStep === 2 && propertyDetail && (
              <div style={{ marginBottom: "30px" }}>
                <h2
                  style={{
                    marginBottom: "10px",
                    color: "#333333",
                    fontWeight: 500,
                  }}
                >
                  Payment Summary
                </h2>
                <p
                  style={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    color: "#666666",
                  }}
                >
                  Property:{" "}
                  <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                    {propertyDetail.propertyName}
                  </span>
                </p>
                <p
                  style={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    color: "#666666",
                  }}
                >
                  Booking Fee:{" "}
                  <span style={{ color: "#5e5e5e", fontWeight: 600 }}>$3</span>
                </p>
                <p
                  style={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    color: "#666666",
                  }}
                >
                  Payment Method:{" "}
                  <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                    {selectedPaymentMethod}
                  </span>
                </p>

                {selectedPaymentMethod === "Credit/Debit Card" && (
                  <>
                    <p
                      style={{
                        marginLeft: "10px",
                        fontSize: "15px",
                        color: "#666666",
                      }}
                    >
                      Card Number:{" "}
                      <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                        {form.getFieldValue("cardNumber")}
                      </span>
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        fontSize: "15px",
                        color: "#666666",
                      }}
                    >
                      Expiry Date:{" "}
                      <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                        {form.getFieldValue("expiry")?.format(monthFormat)}
                      </span>
                    </p>
                    <p
                      style={{
                        marginLeft: "10px",
                        fontSize: "15px",
                        color: "#666666",
                      }}
                    >
                      Cardholder Name:{" "}
                      <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                        {form.getFieldValue("name")}
                      </span>
                    </p>
                  </>
                )}

                {(selectedPaymentMethod === "MTN Mobile Money" ||
                  selectedPaymentMethod === "Airtel Money") && (
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: "15px",
                      color: "#666666",
                    }}
                  >
                    Phone Number:{" "}
                    <span style={{ color: "#5e5e5e", fontWeight: 600 }}>
                      {form.getFieldValue("phoneNumber")}
                    </span>
                  </p>
                )}

                {selectedPaymentMethod === "PayPal" && (
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: "15px",
                      color: "#666666",
                    }}
                  >
                    PayPal Email: {form.getFieldValue("email")}
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default PropertyDetailPage;

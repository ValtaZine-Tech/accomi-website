/* eslint-disable no-unused-vars */

import { Button, Carousel, ConfigProvider, Select, Spin, Tag } from "antd"
import { asset, images } from "../assets/assets"
import GoogleMapsComp from "../components/GoogleMapsComp"
import { SearchOutlined } from '@ant-design/icons';
import Footer from "../partials/Footer"
import Navbar from "../partials/Navbar"
import './styles.css'
import { useEffect, useState } from "react";
import { BaseApiService } from "../utils/BaseApiService";


const PropertyPage = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchParameters = { offset: 0, limit: 100 };

    const fetchProperties = async () => {
        try {
            console.log("Fetching properties from API...");
            const response = await new BaseApiService("/properties")
            .getRequestWithJsonResponse(searchParameters)
            .then((response)=>{
                
            })
            console.log("API Response:", response);
            setProperties(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching properties:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    });

    // if (loading) {
    //     return <div className="loading-container"><Spin size="large" /></div>;
    // }

    // if (error) {
    //     return <div className="error-container">Error: {error}</div>;
    // }

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            colorBorder: '#ffffff',
                            colorPrimary: '#fdb10e',
                            hoverBorderColor: '#fdb10e',
                            borderRadius: 6,
                            controlHeight: 40,
                            fontSize: 15,
                            paddingInline: 10,
                            fontSizeIcon: 16,
                        },
                        Button: {
                            colorPrimary: '#fdb10e',
                            borderRadius: 6,
                            height: 40,
                            width: '10rem',
                            border: 'none',
                            fontSize: '15px'
                        },
                        Carousel: {
                            dotActiveColor: '#fdb10e',
                            dotColor: '#ffffff',
                            dotSize: '10px',
                        },
                    },
                }}
            >
                <Navbar />
                <>
                    <header className="header-container">

                        <div className="header-card">

                            <h1>Redefining <span style={{ color: '#fdb10e' }}>Student</span> Accommodation. </h1>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                                <div>
                                    <img src={asset.hSearch} alt="" style={{ width: '50px', height: '50px' }} />
                                </div>
                                <div>
                                    <p>Personalised Recommendations based on your preferences.</p>
                                    <p style={{ fontSize: '14px', fontWeight: '300' }}> <i className="fa-solid fa-zap"></i> Takes less than 60 seconds</p>
                                </div>
                            </div>



                        </div>


                        <div className="header-socials">

                            <div className="filler"></div>

                            <div>

                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>

                                <a href="https://www.instagram.com/accomi.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>

                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>

                                <a href="https://www.tiktok.com/@accomi.ae?_t=ZM-8t3WgCSOqoP&_r=1" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>

                            </div>


                            <div className="filler"></div>

                        </div>



                        <div className="header-overlay"></div>

                        <div className="header-background">
                            <img src={images.header2} alt="Header background image" loading="lazy" />
                        </div>

                    </header>

                    <section style={{ padding: '5vh 0', margin: '0' }}>

                        <div className="header-property-search">
                            <div className="property-search-inputs">
                                <Select placeholder="Location" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {/* {ugandanCities.map(city => <Select.Option key={city.value} value={city.value}>{city.label}</Select.Option>)} */}
                                </Select>
                                <Select placeholder="Property Type" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {/* {propertyTypes.map(type => <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>)} */}
                                </Select>
                                <Select placeholder="Room Type" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {/* {roomTypes.map(type => <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>)} */}
                                </Select>
                                <Select placeholder="Budget" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {/* {budgetRanges.map(range => <Select.Option key={range.value} value={range.value}>{range.label}</Select.Option>)} */}
                                </Select>
                                <Button type="primary" icon={<SearchOutlined />} style={{ background: '#fdb10e', height: '40px', width: '10rem', borderRadius: 6, border: 'none' }}>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </section>



                    <section style={{ padding: '0 0 5vh 0', margin: '0 3vw' }}>
                        <h1 style={{ fontWeight: 500, marginBottom: '20px' }}>Top Rated Properties</h1>
                        <div className="ppty-card-container">
                            {properties.map((property, index) => (
                                <div className="ppty-card" key={property.id}>
                                    <div className="ppty-card-image">
                                        <Carousel dots={true} infinite={false} effect="fade" draggable>
                                            {property.imageUrls.map((image, imgIndex) => (
                                                <div className="ppty-image" key={imgIndex}>
                                                    <img src={image} alt={`Property ${index + 1} - Image ${imgIndex + 1}`} />
                                                    <div className="image-count-tag">
                                                        <i className="fa-regular fa-image" style={{ color: '#ffffff' }}></i>
                                                        <p style={{ color: '#ffffff', lineHeight: 0, }}>{property.imageUrls.length}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </Carousel>
                                        <div className="availability-tag" style={{ background: property.available ? '#fdb10e' : '#111143' }}>
                                            <p style={{ color: '#ffffff', lineHeight: 0, }}>{property.available ? 'Available' : 'Occupied'}</p>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem 1rem 0.7rem 1rem' }}>

                                        <h3>{property.title}</h3>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '.4rem' }}>
                                                <i className="fa-solid fa-building" style={{ color: '#fdb10e' }}></i>
                                                <p style={{ fontSize: '0.9rem', color: '#8e8e8e' }}>{property.type}</p>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '.4rem' }}>
                                                <i className="fa-solid fa-location-dot" style={{ color: '#fdb10e' }}></i>
                                                <p style={{ fontSize: '0.9rem', color: '#8e8e8e' }}>{property.location}</p>
                                            </div>
                                        </div>

                                        <div className="amenities-container">
                                            {property.amenities.map((amenity, aIndex) => (
                                                <div color="orange" className="amenity-tag" key={aIndex}>
                                                    {/* <i className="fa-solid fa-check" style={{ color: '#fdb10e' }}></i> */}
                                                    <p style={{ fontSize: '0.8rem' }}>{amenity}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <p>{property.description}</p>
                                        <h3 style={{ marginTop: 2 }}>{property.price}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>



                    <section style={{ padding: '5vh 0', margin: '0' }}>
                        <div className="map-container">
                            {/* <GoogleMapsComp /> */}
                        </div>
                    </section>

                </>
                <Footer />
            </ConfigProvider>
        </>
    )
}

export default PropertyPage
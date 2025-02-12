/* eslint-disable no-unused-vars */

import { Button, Carousel, ConfigProvider, Select, Tag } from "antd"
import { asset, images } from "../assets/assets"
import GoogleMapsComp from "../components/GoogleMapsComp"
import { SearchOutlined } from '@ant-design/icons';
import Footer from "../partials/Footer"
import Navbar from "../partials/Navbar"
import './styles.css'


const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "hostel", label: "Hostel" },
    { value: "penthouse", label: "Penthouse" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "duplex", label: "Duplex" },
];

const roomTypes = [
    { value: "apartment", label: "Ensuite" },
    { value: "hostel", label: "Twin Ensuite" },
    { value: "penthouse", label: "One Bed Apartment" },
    { value: "townhouse", label: "Two Bed Apartment" },
    { value: "villa", label: "Non-Ensuite" },
    { value: "duplex", label: "Twin-Studio" },
];

const budgetRanges = [
    { value: "150000-300000", label: "UGX. 150 - 300" },
    { value: "300000-500000", label: "UGX. 300 - 500" },
    { value: "500000-800000", label: "UGX. 500 - 800" },
    { value: "800000-1000000", label: "UGX. 800 - 1m" },
    { value: "1000000-1500000", label: "UGX. 1m - 1.5m" },
]

const ugandanCities = [
    { value: "kampala", label: "Kampala" },
    { value: "entebbe", label: "Entebbe" },
    { value: "jinja", label: "Jinja" },
    { value: "mbale", label: "Mbale" },
    { value: "gulu", label: "Gulu" },
];

const propertyInfo = [
    {
        images: [images.property1, images.property2, images.property3, images.property4],
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        location: "Kampala, Uganda",
        price: "UGX.500,000 /month",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Nullam nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi.",
        type: 'Apartment',
        availability: 'Available',
        amenities: ['Wifi', 'Parking', 'Security', 'Furnished'],
    },
    {
        images: [images.property1, images.property2, images.property3, images.property4],
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        location: "Kampala, Uganda",
        price: "UGX.500,000 /month",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Nullam nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi.",
        type: 'Apartment',
        availability: 'Available',
        amenities: ['Wifi', 'Parking', 'Security', 'Furnished'],
    },
    {
        images: [images.property1, images.property2, images.property3, images.property4],
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        location: "Kampala, Uganda",
        price: "UGX.500,000 /month",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Nullam nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi.",
        type: 'Apartment',
        availability: 'Available',
        amenities: ['Wifi', 'Parking', 'Security', 'Furnished'],
    },
    {
        images: [images.property1, images.property2, images.property3, images.property4],
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        location: "Kampala, Uganda",
        price: "UGX.500,000 /month",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Nullam nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi.",
        type: 'Apartment',
        availability: 'Available',
        amenities: ['Wifi', 'Parking', 'Security', 'Furnished'],
    }
]

const PropertyPage = () => {
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
                                    {ugandanCities.map(city => <Select.Option key={city.value} value={city.value}>{city.label}</Select.Option>)}
                                </Select>
                                <Select placeholder="Property Type" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {propertyTypes.map(type => <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>)}
                                </Select>
                                <Select placeholder="Room Type" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {roomTypes.map(type => <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>)}
                                </Select>
                                <Select placeholder="Budget" style={{ width: '18vw', height: '40px' }} allowClear>
                                    {budgetRanges.map(range => <Select.Option key={range.value} value={range.value}>{range.label}</Select.Option>)}
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
                            {propertyInfo.map((info, index) => (
                                <div className="ppty-card" key={index}>
                                    <div className="ppty-card-image">
                                        <Carousel dots={true} infinite={false} effect="fade" draggable >
                                            {info.images.map((image, imgIndex) => (
                                                <div className="ppty-image" key={imgIndex}>
                                                    <img src={image} alt={`Property ${index + 1} - Image ${imgIndex + 1}`} />
                                                    <div className="image-count-tag">
                                                        <i className="fa-regular fa-image" style={{ color: '#ffffff' }}></i>
                                                        <p style={{ color: '#ffffff', lineHeight: 0, }}>{info.images.length}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </Carousel>
                                        <div className="availability-tag" style={{ background: info.availability === 'Available' ? '#fdb10e' : '#111143' }}>
                                            <p style={{ color: '#ffffff', lineHeight: 0, }}>{info.availability}</p>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.5rem 1rem 0.7rem 1rem' }}>

                                        <h3>{info.title}</h3>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '.4rem' }}>
                                                <i className="fa-solid fa-building" style={{ color: '#fdb10e' }}></i>
                                                <p style={{ fontSize: '0.9rem', color: '#8e8e8e' }}>{info.type}</p>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '.4rem' }}>
                                                <i className="fa-solid fa-location-dot" style={{ color: '#fdb10e' }}></i>
                                                <p style={{ fontSize: '0.9rem', color: '#8e8e8e' }}>{info.location}</p>
                                            </div>
                                        </div>

                                        <div className="amenities-container">
                                            {info.amenities.map((amenity, aIndex) => (
                                                <div color="orange" className="amenity-tag" key={aIndex}>
                                                    {/* <i className="fa-solid fa-check" style={{ color: '#fdb10e' }}></i> */}
                                                    <p style={{ fontSize: '0.8rem' }}>{amenity}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <p>{info.description}</p>
                                        <h3 style={{ marginTop: 2 }}>{info.price}</h3>
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
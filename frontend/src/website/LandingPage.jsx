import { Link } from "react-router-dom"
import { asset, images, roomType } from "../assets/assets"
import InfiniteMarquee from 'vanilla-infinite-marquee';
import Navbar from "../partials/Navbar"
import './styles.css'
import Footer from "../partials/Footer"
import 'animate.css';
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import { Button } from "antd";

const roomTypes = [
    {
        title: "Ensuite",
        des: "Private room with its own bathroom, and a communal kitchen.",
        image: roomType.type1,
    },
    {
        title: "Twin-Ensuite",
        des: "Shared bedroom with two beds and a private attached bathroom.",
        image: roomType.type2,
    },
    {
        title: "One Bed Apartment",
        des: "Private one-bedroom apartment with separate living and sleeping areas.",
        image: roomType.type3,
    },
    {
        title: "Two Bed Apartment",
        des: "Private two-bedroom apartment with separate living and sleeping areas.",
        image: roomType.type4,
    },
    {
        title: "Non-Ensuite",
        des: "A private room with personal space and a shared bathroom.",
        image: roomType.type5,
    },
    {
        title: "Twin-Studio",
        des: "A private room with personal space and a shared bathroom.",
        image: roomType.type6,
    },
]


const LandingPage = () => {

    // const searchParams = useState({
    //   offset: 0,
    //   limit: 10,
    //   filter: "roles.type==STUDENT", // Example filter for students
    //   sort: "dateCreated,desc"
    // });

    const marqueeInitialized1 = useRef(false);
    const marqueeInitialized2 = useRef(false);
    const marqueeInitialized3 = useRef(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (!marqueeInitialized1.current) {
            new InfiniteMarquee({
                element: ".intro-slider-comp",
                speed: 20000,
                smoothEdges: true,
                duplicateCount: 1,
                direction: "left",
                mobileSettings: {
                    direction: "left",
                    speed: 20000,
                },
                on: {
                    beforeInit: () => {

                    },
                    afterInit: () => {
                        marqueeInitialized1.current = true;
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        if (!marqueeInitialized2.current) {
            new InfiniteMarquee({
                element: ".room-type-card",
                speed: 60000,
                smoothEdges: true,
                duplicateCount: 1,
                direction: "left",
                mobileSettings: {
                    direction: "left",
                    speed: 60000,
                },
                on: {
                    beforeInit: () => {

                    },
                    afterInit: () => {
                        marqueeInitialized2.current = true;
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        if (!marqueeInitialized3.current) {
            new InfiniteMarquee({
                element: ".room-type-card2",
                speed: 60000,
                smoothEdges: true,
                duplicateCount: 1,
                direction: "right",
                mobileSettings: {
                    direction: "right",
                    speed: 2000000,
                },
                on: {
                    beforeInit: () => {

                    },
                    afterInit: () => {
                        marqueeInitialized3.current = true;
                    }
                }
            });
        }
    }, []);


    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(UserSessionUtils.isAuthenticated());
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('app-auth-change', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('app-auth-change', handleStorageChange);
        };
    }, []);

    useEffect(() => {
            if (isAuthenticated) {
                const details = UserSessionUtils.getUserDetails();
                setUserDetails(details);
                console.log("User details:", details);
            } else {
                setUserDetails(null);
            }
        }, [isAuthenticated]);

    return (
        <>
            <Navbar />
            <>
                <header className="header-container">
                    <div className="header-card">
                        <h1>
                            Find A <span style={{ color: "#fdb10e" }}>House</span> That Suits
                            You.
                        </h1>

                        <p>Want to find a home? We are ready to help you find one that suits your lifestyle and needs.</p>

                        <ul>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src={asset.htag} alt="" style={{ width: '20px', height: '20px' }} />
                                <p>Lowest Price Guarantee</p>
                            </li>
                            <li>|</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src={asset.call} alt="" style={{ width: '20px', height: '20px' }} />
                                <p>Personal Assistance</p>
                            </li>
                            <li>|</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src={asset.building} alt="" style={{ width: '20px', height: '20px' }} />
                                <p>Verified Listings</p>
                            </li>
                        </ul>

                        <div className="header-btns">
                        {userDetails?.roles?.some(role => role.type === "STUDENT") ? (  
                            <Link to="/properties" onClick={() => { window.scrollTo(0, 0); }}>
                                <Button className="header-btn">Let&apos;s Find My Home</Button>
                            </Link>
                        ) : (
                            <Link to="/student" onClick={() => { window.scrollTo(0, 0,); }}>
                                <Button className="header-btn">Get Started As Student</Button>
                            </Link>
                        )}

                            <Link to="/about" onClick={() => { window.scrollTo(0, 0); }}>
                                <Button className="header-btn2"> Learn More </Button>
                            </Link>
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
                            src={images.header2}
                            effect="blur"
                            style={{ objectPosition: 'center', width: '100vw' }}
                            alt="Header background image"

                        />
                    </div>
                </header>

                <section style={{ padding: '5vh 0', margin: '0' }}>

                    <div className="intro-container" style={{ margin: '0 5vw' }}>
                        <div className="intro-container-card">
                            <div className="intro-card">
                                <h2>Where every student feels at home!</h2>
                                <p>Get personalised options with your preferences in just a few clicks</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={asset.check} alt="" style={{ width: '25px', height: '25px' }} />
                                    <p style={{ color: '#333333' }}>Safe, Secure and Guranteed</p>
                                </div>
                                {userDetails?.roles?.some(role => role.type === "STUDENT") ? (  
                                    <Link to="/properties">
                                        <Button className="intro-cta" onClick={()=> window.scroll(0,0)}> Let&apos;s Find My Home </Button>
                                    </Link>
                                ) : (
                                    <Link to="/student">
                                        <Button className="intro-cta" onClick={()=> window.scroll(0,0)}> Get Started As Student </Button>
                                    </Link>
                                )}
                                <div className="intro-slider-wrapper">
                                    <div className="intro-slider-comp">
                                        <div className="intro-comp">
                                            <div>
                                                <h2>10+</h2>
                                                <p>Countries</p>
                                            </div>
                                        </div>
                                        <div className="isc-separator"></div>
                                        <div className="intro-comp">
                                            <div>
                                                <h2>200+</h2>
                                                <p>Cities</p>
                                            </div>
                                        </div>
                                        <div className="isc-separator"></div>
                                        <div className="intro-comp">
                                            <div>
                                                <h2>1k+</h2>
                                                <p>Properties</p>
                                            </div>
                                        </div>
                                        <div className="isc-separator"></div>
                                        <div className="intro-comp">
                                            <div>
                                                <h2>2k+</h2>
                                                <p>Students</p>
                                            </div>
                                        </div>
                                        <div className="isc-separator"></div>
                                    </div>
                                </div>
                                <div className="intro-card-image">
                                    <img src={images.intro1} alt="" style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>


                            <div className="intro-card">
                                <div>
                                    <div>
                                        <img src={asset.care} alt="" style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div>
                                        <p>24x7 Personal Assistance</p>
                                        <p>We offer 24x7 expert support in resolving all your housing-related queries, providing peace of mind!</p>

                                    </div>
                                </div>
                                <div className="ic-separator"></div>
                                <div>
                                    <div>
                                        <img src={asset.tag} alt="" style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div>
                                        <p>Price Match Guarantee</p>
                                        <p>If you find a lower price for this accommodation on another platform, we&apos;ll match it when you book.</p>

                                    </div>
                                </div>
                                <div className="ic-separator"></div>
                                <div>
                                    <div>
                                        <img src={asset.visa} alt="" style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div>
                                        <p>No Visa, No Pay</p>
                                        <p>If you are unable to obtain a visa, you can cancel your booking at no cost.</p>

                                    </div>
                                </div>
                                <div className="ic-separator"></div>
                                <div>
                                    <div>
                                        <img src={asset.verified} alt="" style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div>
                                        <p>Verified Listings</p>
                                        <p>All our properties are verified, which guarantees a seamless booking experience.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section style={{ padding: '5vh 0', margin: '0' }}>
                    <div className="property-owners-container">

                        <img src={images.poIMG} alt="background image" />

                        <div className="poc-card">
                            <h1>Expand Your Reach, Maximize Your Earnings</h1>
                            <p>Are you a property owner or agent? List your property on Accomi to reach a global student audience.</p>
                            <Link to="/landlord-agent" onClick={() => { window.scrollTo(0, 0); }}>
                                <Button className="poc-cta">Learn more</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '0', margin: '0' }}>

                    <div className="room-type-card-container">
                        <div className="room-type-card">
                            {roomTypes.map((value) => (
                                <div className="rtc" key={value.title}>
                                    <div className="rtc-image">
                                        <img src={value.image} alt={value.title} />
                                    </div>
                                    <p>{value.title}</p>
                                    <span>{value.des}</span>
                                </div>
                            ))}
                        </div>
                        <div className="room-type-card2">
                            {roomTypes.map((value) => (
                                <div className="rtc" key={value.title}>
                                    <div className="rtc-image">
                                        <img src={value.image} alt={value.title} />
                                    </div>
                                    <p>{value.title}</p>
                                    <span>{value.des}</span>
                                </div>
                            ))}
                            <div className="rtc-overlay"></div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '5vh 0', margin: '0 5vw' }}>
                    <div className="property-dir-container">
                        <h2>Explore <span style={{ color: '#fdb10e' }}>10+ room types</span> across properties globally.</h2>
                        <Link to="/properties">
                            <button className="pdc-cta">Discover Now</button>
                        </Link>
                    </div>
                </section>

            </>

            <Footer />
        </>
    );
};

export default LandingPage;

import { Link } from "react-router-dom";
import { asset, images } from "../assets/assets";
import Footer from "../partials/Footer";
import Navbar from "../partials/Navbar";
import "./styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { UserSessionUtils } from "../utils/UserSessionUtils";
import { Button } from "antd";

const LandlordAgent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setIsAuthenticated(UserSessionUtils.isAuthenticated());
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
          <div className="header-card header-la-card">
            <h1 >
              Expand Your Reach, {""}
              <span style={{ color: "#fdb10e" }}>Maximize</span> Your Earnings
            </h1>
            <p>
              List your property and connect with a global student audience with
              Accomi.
            </p>

            <div className="header-btns">
              {userDetails?.roles?.some((role) => role.type === "LANDLORD") ? (
                <Link to="/property-dashboard">
                  <button className="header-btn">Go to My Dashboard</button>
                </Link>
              ) : (
                <Link to="/account-creation">
                  <Button className="header-btn">Let&apos;s Get Started</Button>
                </Link>
              )}
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
              src={images.agtBG}
              alt="Header background image"
            />
          </div>
        </header>

        <section style={{ padding: "5vh 0", margin: "0 5vw" }}>
          <h1 style={{ fontWeight: 500, marginBottom: "20px", marginTop: "-5vh" }}>
            Why Choose Us?
          </h1>
          <div className="wcu-container">
            <div className="wcu-card">
              <div className="wcu-card-image">
                <img src={asset.cloud} alt="cloud icon" />
              </div>
              <h2>Hassle-Free Management</h2>
              <p>
                From listing to booking, we handle the details so you can focus
                on what matters.
              </p>
            </div>

            <div className="wcu-card">
              <div className="wcu-card-image">
                <img src={asset.stats} alt="statistic icon" />
              </div>
              <h2>Grow Profits with Broader Reach</h2>
              <p>
                Tap into a vast pool of international students looking for
                accommodation.
              </p>
            </div>

            <div className="wcu-card">
              <div className="wcu-card-image">
                <img src={asset.house} alt="house icon" />
              </div>
              <h2>Zero Listing Fees</h2>
              <p>List as many properties as you want—no limits.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 5vh 0", margin: "0 6vw" }}>
            <h1 style={{ fontWeight: 500, marginBottom: "20px" }}>
              How It Works?
            </h1>
          <div className="hiw-container">

            <div className="hiw-card">
              <div className="hiw-tag">
                <p>1</p>
              </div>
              <div className="hiw-card-image">
                <img src={images.step1} alt="step 1 image" />
              </div>
              <div style={{ padding: "0.1rem 1.2rem" }}>
                <h2>Create Your Listing</h2>
                <p>Create an account and list your property in minutes.</p>
              </div>
            </div>

            <div className="hiw-card">
              <div className="hiw-tag">
                <p>2</p>
              </div>
              <div className="hiw-card-image">
                <img src={images.step2} alt="step 2 image" />
              </div>
              <div style={{ padding: "0.1rem 1.2rem" }}>
                <h2>Connect With Students</h2>
                <p>
                  Students will discover your property through our Property
                  Management System.
                </p>
              </div>
            </div>

            <div className="hiw-card">
              <div className="hiw-tag">
                <p>3</p>
              </div>
              <div className="hiw-card-image">
                <img src={images.step3} alt="step 3 image" />
              </div>
              <div style={{ padding: "0.1rem 1.2rem" }}>
                <h2>Manage With Ease</h2>
                <p>
                  Easily handle bookings and communications through our Property
                  Management System
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </>
  );
};

export default LandlordAgent;

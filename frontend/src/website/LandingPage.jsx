import { Link } from "react-router-dom";
import { images } from "../assets/assets";
import Navbar from "../partials/Navbar";
import "./styles.css";
import Footer from "../partials/Footer";
import { useEffect } from "react";
import { BaseApiService } from "../utils/BaseApiService";

const LandingPage = () => {
  const searchParameters = { offset: 0, limit: 10 };
//Sample for GET request
  const fetchUsers = () => {
    new BaseApiService("/users")
      .getRequestWithJsonResponse(searchParameters)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

            <p>
              Want to find a home? We are ready to help you find one that suits
              your lifestyle and needs.
            </p>

            <Link to="/account-type">
              <button className="header-btn">Create an account </button>
            </Link>
          </div>

          <div className="header-card"></div>

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
            <img
              src={images.header2}
              alt="Header background image"
              loading="lazy"
            />
          </div>
        </header>

        <section className="about-container">
          <div className="about-container-card">
            <div className="about-card">
              <div className="section-intro">
                <div className="bullet"></div>
                <p>ABOUT US</p>
              </div>

              <h1>
                What is <span style={{ color: "#fdb10e" }}>Accomi</span> all
                about?
              </h1>

              <div>
                <div className="bullet"></div>
                <p>
                  Accomi is a platform that connects students looking for
                  residencies with property owners. We are dedicated to
                  providing you with the best experience in finding a home that
                  suits your lifestyle and needs.
                </p>
              </div>

              <Link to="/about">
                <button className="about-btn">Learn More</button>
              </Link>
            </div>

            <div className="about-card-image">
              <div className="edge1">
                <div></div>
                <div></div>
              </div>

              <img src={images.about3} alt="About us" loading="lazy" />

              <div className="edge2">
                <div></div>
                <div></div>
              </div>

              <div className="about-image-overlay"></div>
            </div>
          </div>
        </section>
      </>

      <Footer />
    </>
  );
};

export default LandingPage;

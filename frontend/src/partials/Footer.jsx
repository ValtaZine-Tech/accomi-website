import { LazyLoadImage } from 'react-lazy-load-image-component'
import './styles.css'
import { asset } from '../assets/assets'

const Footer = () => {
  return (
    <>
      <footer className="footer-container">

        <div className="footer-card">
          <div className="fc">
            <div className="nav-logo">
              <LazyLoadImage
                src={asset.logo}
                alt="accomi logo"
                effect="blur"
                style={{ width: "80px", height: "80px" }}
              />
              <h2>ccomi</h2>
            </div>
            
          </div>
          <div className="fc">
            <h2>Quick Links</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="fc">
            <h2>Information</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>

          </div>
          <div className="fc">
            <h2>Get in Touch</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>

            <div className="fc-contacts">
              <div>
                <i className="fa-solid fa-envelope"></i>
                {/* <p>Email:</p> */}
                <div>
                  <a href="mailto:info@accomi.org">info@accomi.org</a>
                </div>
              </div>

              <div>
                <i className="fa-solid fa-phone"></i>
                {/* <p>Contacts:</p> */}
                <div>
                  <a href="tel:+256">0778923713</a>
                  <p style={{ padding: "0 8px", fontSize: 16, lineHeight: "normal", color: "#fdb10e" }}>or</p>
                  <a href="tel:+256">0758883725</a>
                </div>
              </div>
            </div>

            <h2>Our Socials</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>

            <div className="fc-socials">
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

          </div>
        </div>

        <div className="footer-separator">
        </div>

        <p>&copy; 2023-2025 Accomi - All Rights Reserved</p>

      </footer>
    </>
  )
}

export default Footer
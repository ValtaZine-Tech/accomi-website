import { LazyLoadImage } from 'react-lazy-load-image-component'
import './styles.css'
import { asset } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Input } from 'antd'


const Footer = () => {
  return (
    <>
      <footer className="footer-container">

        <div className="footer-card">

          <div className="fc">
            <div className="footer-logo">
              <LazyLoadImage
                src={asset.logo}
                alt="accomi logo"
                effect="blur"
                style={{ width: "120px", height: "140px" }}
              />
              <h2>ccomi</h2>
            </div>
            <p style={{marginTop: '1.2rem'}}>Accomi offers premium student accommodation at affordable prices. Easily compare, consult, and choose your ideal student housing with Accomi.</p>

            <h3 style={{color: '#ffffff', marginTop: '20px',marginBottom: '5px'}}>Sign up to our newsletter</h3>
            <div className="input-card">
              <Input placeholder="Enter your email" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>


          <div className="fc">
            <h2>Company</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>
            <ul className='list-container'>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/landlord-agent">Agent</Link>
              </li>
              <li>
                <Link to="/properties">Properties</Link>
              </li>
              

            </ul>
          </div>


          <div className="fc">
            <h2>Discover</h2>
            <div className="fc-separator">
              <div></div>
              <div></div>
            </div>

            <ul className='list-container'>
              <li>
                <Link to="#">FAQs</Link>
              </li>
              <li>
                <Link to="#">How it Works</Link>
              </li>
              <li>
                <Link to="#">Our Services</Link>
              </li>
              <li>
                <Link to="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
            </ul>

          </div>


          <div className="fc">
            <h2>Contact Us</h2>
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
                  <p style={{ padding: "0 5px", fontSize: 16, lineHeight: "normal", color: "#fdb10e" }}>|</p>
                  <a href="tel:+256">0758883725</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-separator">
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
          <p style={{ textAlign: "left" }}>&copy; 2023-2025 Accomi - All Rights Reserved</p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }}>
            {/* <h2 style={{color:"#FFFFFF"}}>Our Socials</h2> */}
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



      </footer>
    </>
  )
}

export default Footer
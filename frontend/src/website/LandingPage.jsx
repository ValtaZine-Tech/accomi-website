import Navbar from "../partials/Navbar"
import './styles.css'


const LandingPage = () => {
    return (
        <>
            <Navbar />
            <>
                <header className="header-container">

                    <div className="header-card">

                        <h1>Find A <span style={{color:'#fdb10e'}}>House</span> That Suits You.</h1>

                        <p>Want to find a home? We are ready to help you find one that suits your lifestyle and needs.</p>

                        <button className="header-btn"><i className="fa-solid fa-chevron-left" style={{ fontSize: 15 }} ></i>
                            Find Your Perfect Home <i className="fa-solid fa-chevron-right" style={{ fontSize: 15 }} ></i></button>

                    </div>

                    <div className="header-card"></div>

                    <div className="header-socials">

                        <div className="filler"></div>

                        <div>

                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>

                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram"></i>
                            </a>

                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>

                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>

                        </div>


                        <div className="filler"></div>

                    </div>



                    <div className="header-overlay"></div>

                </header>
            </>
        </>
    )
}

export default LandingPage
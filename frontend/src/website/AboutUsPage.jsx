import { LazyLoadImage } from "react-lazy-load-image-component"
import { images } from "../assets/assets"
import Footer from "../partials/Footer"
import Navbar from "../partials/Navbar"


const AboutUsPage = () => {
    return (
        <>
            <Navbar />
            <>
                <header className="header-container">
                    <div className="header-card">
                        <h1>Who We Are <span style={{ color: '#fdb10e' }}>And</span> What We Do.</h1>
                        <p style={{ marginBottom: '2vh' }}>Accomi is a rapidly growing platform offering ideal student housing across borders.
                        </p>
                        <p>Finding student accommodation is now easier with Accomi, designed to streamline and enhance your living experience!
                        </p>

                    </div>
                    <div className="header-card"></div>
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
                        <LazyLoadImage effect="blur" style={{objectPosition: 'center', width: '100vw'}} src={images.abtBG} alt="Header background image" loading="lazy"/>
                    </div>
                </header>

                <section style={{ padding: '5vh 5vw', margin: '0' }}>
                    <div className="abt-container">
                        <div className="abt-card-image">
                            <img src={images.mission} alt="" />
                            <div className="about-image-overlay"></div>
                        </div>
                        <div className="abt-card" style={{ width: '40vw' }}>
                            <h1>Our <span style={{ color: '#fdb10e' }}>Mission</span></h1>
                            <p style={{ marginBottom: '2vh' }}>Accomi intends to provide students with the most important part of their study journey: Accommodation.
                            </p>
                            <p>Our sole mission is to provide a home that is fully equipped with uber-comfort and top facilities at reasonable prices!
                            </p>
                        </div>
                    </div>
                </section>



                <section style={{ padding: '5vh 5vw', margin: '0', background: '#e4e4e4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="team-container">
                        <div className="team-card" style={{ width: '40vw' }}>
                            <h1>Our <span style={{ color: '#fdb10e' }}>Team</span>, Behind The Scenes</h1>
                            <p style={{ marginBottom: '2vh' }}>As it is rightly said, “Talent wins games, but teamwork and intelligence win championships”. Our team of champions work every day to bring quality & value to work.</p>
                            <p>With positivity and integrity as our pillars, our team of experts work hand-in-hand to bring top-quality accommodations for students.</p>
                        </div>
                        <div className="team-card-images">
                            <div className="tci">
                                <div>
                                <img src={images.team1} alt="" />
                                </div>
                                <div>
                                    <img src={images.team3} alt="" />
                                </div>
                            </div>

                            <div className="tci">
                                <div>
                                    <img src={images.team2} alt="" />
                                </div>
                                <div>
                                    <img src={images.team4} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>



                <section style={{ padding: '5vh 5vw', margin: '0' }}>
                    <div className="ach-container">
                        <div className="ach-card">
                            <div className="ach">
                                <img src={images.globe} alt="" style={{ width: '50px', height: '50px' }} />
                                <h1>10+</h1>
                                <p>Countries</p>
                            </div>
                            <div className="ach">
                                <img src={images.location} alt="" style={{ width: '50px', height: '50px' }} />
                                <h1>200+</h1>
                                <p>Cities</p>
                            </div>
                            <div className="ach">
                                <img src={images.properties} alt="" style={{ width: '50px', height: '50px' }} />
                                <h1>1,500+</h1>
                                <p>Properties</p>
                            </div>
                            <div className="ach">
                                <img src={images.medal} alt="" style={{ width: '50px', height: '50px' }} />
                                <h1>2,200+</h1>
                                <p>Students Booked</p>
                            </div>
                        </div>
                        <div className="ach-card" style={{ width: '40vw' }}>
                            <h1>Aiming <span style={{ color: '#fdb10e' }}>High</span>, Soaring Higher</h1>

                            <p style={{ marginBottom: '2vh' }}>Headquartered in Dubai, with a strong presence in East Africa and beyond, Accomi has a track record of guaranteeing that students find their perfect home.</p>

                            <p>Our properties are positioned in student-friendly cities close to prestigious universities, making students&apos; lives easier!</p>
                        </div>
                    </div>
                </section>
            </>
            <Footer />
        </>
    )
}

export default AboutUsPage
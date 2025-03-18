import { images } from "../assets/assets";
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";
import './styles.css';
import { Col, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const ContactUsPage = () => {
    const [form] = Form.useForm();
    return (
        <>
            <Navbar />
            <>
                <header className="header-container">
                    <div className="header-card">
                        <h1>Keep In <span style={{ color: '#fdb10e' }}>Touch</span> And Updated.</h1>
                        <p>Below you can leave a feedback or inquiry and we will get back to you.</p>
                        <a href="tel:+256">
                            <button className="header-btn"><i className="fa-solid fa-phone" style={{ fontSize: 15 }} ></i>
                                Contact Us </button>
                        </a>
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
                        <img src={images.header2} alt="Header background image" />
                    </div>
                </header>

                <section className="contact-container">
                    <div className="contact-card">
                        <Form
                            form={form}
                            layout="vertical"
                            className="form-card"
                        >
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Full Name"
                                        name="name"
                                        rules={[{ required: true, message: "Please enter your name!" }]}>
                                        <Input placeholder="Enter your full name" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        rules={[{ required: true, message: "Please enter your email" }]}
                                    >
                                        <Input placeholder="Enter your email" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Phone Number"
                                        name="contact"
                                        rules={[{ required: false, message: "Please enter your contact" }]}
                                    >
                                        <Input placeholder="Enter your contact (optional)" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Subject"
                                        name="subject"
                                        rules={[{ required: true, message: "Please select a reason for contacting us" }]}>
                                        <Select placeholder="Select a subject for the message" style={{ height: 40 }}>
                                            <Option value="inquiry">Inquiry</Option>
                                            <Option value="feedback">Feedback</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Message"
                                        name="message"
                                        rules={[{ required: true, message: "Please enter your message" }]}
                                    >
                                        <Input.TextArea className="textarea-box" name="message" id="message" rows={5} placeholder="Write your message here" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <button type="submit" className="form-btn">Submit</button>
                        </Form>
                    </div>
                    <div className="contact-card">
                        <div className="newsletter-card">
                            <h1>Newsletter</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque doloremque facilis animi, explicabo libero officia consequuntur fugiat. Alias amet dolores mollitia quaerat minima tenetur? Repellendus quo tempora in vero ratione.</p>
                            <div className="input-card">
                                <Input placeholder="Enter your email" />
                                <button className="newsletter-btn">Subscribe</button>
                            </div>
                        </div>

                        <div className="contact-info-card">
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
                    </div>
                </section>
            </>

            <Footer />
        </>
    );
};

export default ContactUsPage;
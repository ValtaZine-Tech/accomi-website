import { Col, Form, Input, Row } from "antd"


const Profile = () => {
    return (
        <>
            <div className="step-container">
                <div className="step-card">
                    <h1>Let&apos;s know more about you </h1>
                </div>
                <div className="step-card">
                    <div className="profile-container">
                        <div className="profile-card">
                            <Form
                                layout="vertical"
                            >
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <h2 style={{ color: "#8e8e8e" }}>Personal Information</h2>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your first name" }]}
                                        >
                                            <Input placeholder="Enter your first name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your last name" }]}
                                        >
                                            <Input placeholder="Enter your last name" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your Student Email" }]}
                                        >
                                            <Input placeholder="Enter your student email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your phone number" }]}
                                        >
                                            <Input placeholder="Enter your phone number" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <h2 style={{ color: "#8e8e8e" }}>Academic Information</h2>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your Program of Study" }]}
                                        >
                                            <Input placeholder="Enter your Program of study" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your student ID no." }]}
                                        >
                                            <Input placeholder="Student ID no." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your phone number" }]}
                                        >
                                            <Input placeholder="Year of Study" />
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row gutter={16}>
                                    <Col span={24}>
                                        <h2 style={{ color: "#8e8e8e" }}>Emergency Contact</h2>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your emergency contacts name" }]}
                                        >
                                            <Input placeholder="Enter Full Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter how you call this person" }]}
                                        >
                                            <Input placeholder="Enter Relationship" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter HIS/HER phone number" }]}
                                        >
                                            <Input placeholder="Enter phone number" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <h2 style={{ color: "#8e8e8e" }}>Account Information</h2>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter your emergency contacts name" }]}
                                        >
                                            <Input placeholder="Enter your Password" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter how you call this person" }]}
                                        >
                                            <Input placeholder="Confirm Password" />
                                        </Form.Item>
                                    </Col>
                                    
                                </Row>



                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
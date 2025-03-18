import { Col, Form, Row, Select, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import "./styles.css";

const { Option } = Select;

const LandlordVerification = () => {
  // Remove unused state variables
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');

  // Helper function to read image file as base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImagePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj); // Convert to base64 preview
    }
    // setPreviewImage(file.url || file.preview);
    // setPreviewOpen(true);
  };

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onPreview: handleImagePreview,
  };

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Help us verify your Account.</h1>
          {/*<p>Accomi requires evidence that the property you have entered is under your names to avoid inconviniences.</p> */}
        </div>
        <div className="step-card">
          <div className="verification-container">
            <div className="verification-card">
              <Form layout="vertical">
                <Row gutter={10}>
                  <Col span={24}>
                    <h2 style={{ color: "#8e8e8e" }}>Identity Document</h2>
                  </Col>
                  <Col span={24}>
                    <Form.Item>
                      <Select placeholder="Select Document Type" style={{ width: "100%", height: "35px", textAlign: "left" }}>
                        <Option value="nationalID">National ID</Option>
                        <Option value="passport">Passport</Option>
                        <Option value="national id">Driver&apos;s License</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="identityDocument"
                      rules={[{ required: true, message: "Please upload at least 1 image!" }]}
                      style={{ flex: 1, maxWidth: 500 }}
                    >
                      <div>
                      <Dragger {...props} style={{ maxWidth: "500px" }}>
                        <p className="ant-upload-drag-icon">
                          <PlusOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>  
                      </Dragger>
                      </div>
                    </Form.Item>
                  </Col>





                  <Col span={24}>
                    <h2 style={{ color: "#8e8e8e" }}>Property Document</h2>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="identityDocument"
                      rules={[{ required: true, message: "Please upload at least 1 image!" }]}
                      style={{ flex: 1, maxWidth: 500 }}
                    >
                      <div>
                      <Dragger {...props} style={{ maxWidth: "500px" }}>
                        <p className="ant-upload-drag-icon">
                          <PlusOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>  
                      </Dragger>
                      </div>
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

export default LandlordVerification;
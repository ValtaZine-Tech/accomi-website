/* eslint-disable no-unused-vars */
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col, Upload, Image, message, Steps } from "antd";
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";
import "./styles.css";
import PropTypes from 'prop-types';

const WelcomeStep = ({ onNext }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');



  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const back = () => {
    setShowPropertyForm(false);
  }


  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1 style={{textAlign: 'left'}}>Your All Set And Ready To Start Listing Your Properties.</h1>
          <Link to={''}>Go to Dashboard</Link>
          <Link to={''}>Maybe Later</Link>
        </div>
      </div>
    </>
  )
}
WelcomeStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};


export default WelcomeStep;
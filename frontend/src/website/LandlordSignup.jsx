import { Button, message, Steps } from 'antd';
import Navbar from '../partials/Navbar';
import './styles.css';
import { useState } from 'react';


import { useNavigate } from 'react-router-dom';
import LandlordDetails from './steps/LandlordDetails';

const LandlordSignup = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const studentSteps = [
        {
            title: 'Profile',
            content: <LandlordDetails />,
        },
        
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const back = () => {
        navigate('/account-type')
    }

    const items = studentSteps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    };

    return (
        <>
            <Navbar />

            <div className='booking-container'>
                <Steps
                    current={current}
                    items={items}
                    style={{ '--ant-steps-icon-color': '#fdb10e',color:'#fdb10e' }}
                    progressDot={{ '--ant-steps-icon-color': '#fdb10e' }}
                />
                <div style={contentStyle}>
                    {studentSteps[current]?.content}
                </div>

                <div
                    className='step-nav-btns'
                    style={{
                        marginTop: 24,
                    }}
                >
                    {current > 0 && (
                        <Button
                            type='primary'
                            className='step-prev-btn'
                            onClick={() => prev()}
                            style={{ background: "#fdb10e" }}
                        >
                            <i className='fa-solid fa-chevron-left'></i>
                        </Button>
                    )}
                    {current === 0 && (
                        <Button
                            type='primary'
                            className='step-exit-btn'
                            onClick={() => back()}
                            style={{ border: "2px solid #fdb10e",background:"transparent" }}
                        >
                            <i className='fa-solid fa-chevron-left'></i>
                        </Button>
                    )}
                    {current < studentSteps.length - 1 && (
                        <Button type="primary" className='step-next-btn' onClick={() => next()} style={{ background: "#fdb10e" }}>
                            <i className='fa-solid fa-chevron-right'></i>
                        </Button>
                    )}
                    {current === studentSteps.length - 1 && (
                        <Button type="primary" className='step-done-btn' onClick={() => message.success('Processing complete!')} style={{ background: "transparent",border: "2px solid #fdb10e", }}>
                            <i className='fa-solid fa-chevron-right'></i>
                        </Button>
                    )}

                </div>

            </div>
        </>
    );
};

export default LandlordSignup;
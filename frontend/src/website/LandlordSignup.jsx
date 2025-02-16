import { Button, ConfigProvider, message, Steps } from 'antd';
import Navbar from '../partials/Navbar';
import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandlordDetails from './steps/LandlordDetails';
import LandlordLogin from './steps/LandlordLogin';
import WelcomeStep from './steps/WelcomeStep';

const LandlordSignup = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const landlordSteps = [
        {
            title: 'Create Account',
            content: <LandlordDetails />,
        },
        {
            title: 'Login',
            content: <LandlordLogin />,
        },
        {
            title: 'Finish',
            content: <WelcomeStep onNext={() => setCurrent(current + 1)} />,
        },
        
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const back = () => {
        navigate('/landlord-agent')
    }

    const items = landlordSteps.map((item) => ({
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
        <ConfigProvider
                theme={{
                    components: {
                        Steps: {
                            colorPrimary: '#fdb10e',                            
                        }
                    }
                }}>
            <Navbar />

            <section className='booking-container'>
                <Steps
                    current={current}
                    items={items}                                    
                />
                <div style={contentStyle}>
                    {landlordSteps[current]?.content}
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
                    {current < landlordSteps.length - 1 && (
                        <Button type="primary" className='step-next-btn' onClick={() => next()} style={{ background: "#fdb10e" }}>
                            <i className='fa-solid fa-chevron-right'></i>
                        </Button>
                    )}
                    {current === landlordSteps.length - 1 && (
                        <Button type="primary" className='step-done-btn' onClick={() => message.success('Processing complete!')} style={{ background: "transparent",border: "2px solid #fdb10e", }}>
                            <i className='fa-solid fa-chevron-right'></i>
                        </Button>
                    )}

                </div>

            </section>
            </ConfigProvider>
        </>
    );
};

export default LandlordSignup;
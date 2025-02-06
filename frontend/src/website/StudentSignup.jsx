import { Button, ConfigProvider, message, Steps } from 'antd';
import Navbar from '../partials/Navbar';
import './styles.css';
import { useState } from 'react';
import City from './steps/City';
import University from './steps/University';
import Transfer from './steps/Transfer';
import Duration from './steps/Duration';
import Budget from './steps/Budget';
import HouseType from './steps/HouseType';
import Profile from './steps/Profile';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const studentSteps = [

        {
            title: 'City',
            content: <City />,
        },
        {
            title: 'University',
            content: <University />,
        },
        {
            title: 'Move In',
            content: <Transfer />,
        },
        {
            title: 'Duration',
            content: <Duration />,
        },
        {
            title: 'House Type',
            content: <HouseType />,
        },
        {
            title: 'Budget',
            content: <Budget />,
        },
        {
            title: 'Profile',
            content: <Profile />,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const back = () => {
        navigate('/')
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
            <ConfigProvider
                theme={{
                    components: {
                        Steps: {
                            colorPrimary: '#fdb10e',
                            progressDot: true,
                        }
                    }
                }}>



                <Navbar />
                <>

                    <section className='booking-container'>
                        <Steps
                            current={current}
                            items={items}
                            progressDot= {true}

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
                                    style={{ border: "2px solid #fdb10e", background: "transparent" }}
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
                                <Button type="primary" className='step-done-btn' onClick={() => message.success('Processing complete!')} style={{ background: "transparent", border: "2px solid #fdb10e", }}>
                                    <i className='fa-solid fa-chevron-right'></i>
                                </Button>
                            )}

                        </div>

                    </section>

                </>

            </ConfigProvider>
        </>
    );
};

export default StudentSignup;
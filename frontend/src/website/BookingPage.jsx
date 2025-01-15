import { Button, message, Steps } from 'antd';
import Navbar from '../partials/Navbar';
import './styles.css';
import { useState } from 'react';
import City from './steps/City';
import University from './steps/University';
import Transfer from './steps/Transfer';
import Duration from './steps/Duration';
import Budget from './steps/Budget';
import HouseType from './steps/HouseType';

const steps = [
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
        title: 'Budget',
        content: <Budget />,
    },
    {
        title: 'House Type',
        content: <HouseType />,
    },
];

const BookingPage = () => {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
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
                    style={{ '--antd-wave-shadow-color': '#fdb10e' }}
                    progressDot={{ color: '#fdb10e' }}
                />
                <div style={contentStyle}>{steps[current].content}</div>
                <div
                    style={{
                        marginTop: 24,
                    }}
                >
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()} style={{width:200, backgroundColor: '#fdb10e', borderColor: '#fdb10e'}}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')} style={{width:200}}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                                width:200
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookingPage;
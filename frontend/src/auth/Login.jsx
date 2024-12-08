// eslint-disable-next-line no-unused-vars
import { Alert, Button, Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './styles.css'
import { asset } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = () => {
      navigate('/dashboard'); // Use navigate to redirect
    };

    return (
        <>
            <section className='auth-section'>
                <div className="auth-container">
                    <div className="card" style={{ width: "400px", backgroundColor: "#111241", color: "#ffffff" }}>
                        <div className='auth-img-card'>
                            <img src={asset.logo} alt="" style={{ objectFit: "cover", height: "200px", width: "200px" }} />
                        </div>
                        <h1 style={{fontSize: 20}}>Welcome to Accomi</h1>
                    </div>
                    <div className="card" style={{ width: "350px", padding: "30px" }}>
                        <h2 style={{ padding: "0" }}>Sign in</h2>
                        <p>Enter Your Credientials to access your workspace</p>
                        
                        
                        <Input type="text" className='inputField' placeholder='Enter your Accomi Email' />
                        <Input.Password
                            className='inputField'
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />

                        <Button className="auth-btn" style={{marginTop: 20}} onClick={handleLogin}>Sign in</Button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login

import { Button, Checkbox, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './styles.css';
import { asset } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Login2 = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Simple login logic
        if (email === "guest" && password === "1234") {
            localStorage.setItem("user", "authenticated");
            onLogin(true);
            navigate('/');
            message.success("Logged in Successfully");
        } else if (email === "admin" && password === "admin123") {
            localStorage.setItem("admin", "authenticated");
            onLogin(true);
            navigate('/dashboard');
        } else {
            message.error("Invalid email or password");
        }
    };

    const handleOAuth = () => {
        console.log("OAuth Authentication");
    };

    return (
        <>
            <section className='auth-section'>
                <div className="auth-container">
                    <div className="card" style={{ width: "400px", backgroundColor: "#111241", color: "#ffffff" }}>
                        <div className='auth-img-card'>
                            <img src={asset.logo} alt="" style={{ objectFit: "cover", height: "200px", width: "200px" }} />
                        </div>
                        <h1 style={{ fontSize: 20 }}>Welcome to Accomi</h1>
                    </div>
                    <div className="card" style={{ width: "350px", padding: " 20px 30px" }}>
                        
                        <h2 style={{ padding: "0" }}>Sign in</h2>
                        
                        
                        <Input 
                            type="text" 
                            className='inputField' 
                            placeholder='Enter your Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input.Password
                            className='inputField'
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="checkbox-container" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width: '100%', margin: '5px 0'}}>
                            <Checkbox>Remember me</Checkbox>
                            {/* <a href='#' style={{fontSize:13}}>Forgot Password?</a> */}
                        </div>

                        <button className="auth-btn1" onClick={handleLogin}>Sign in</button>
                        <p style={{margin:"5px 0"}}>Or</p>
                        <Button className="auth-btn2" onClick={handleOAuth}> <img src={asset.googleIcon} alt="" style={{ width: 25, height: 25 }} /> <p>Continue with Google</p></Button>

                        <p style={{marginTop: "10px"}}>Don&apos;t have an account? <Link to='/account-type' style={{color:"#fdb10e"}}>Sign Up</Link></p>
                    </div>

                </div>
            </section>
        </>
    );
};

Login2.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login2;

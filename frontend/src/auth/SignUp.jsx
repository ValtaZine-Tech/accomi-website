// eslint-disable-next-line no-unused-vars
import { Alert, Button, Checkbox, Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './styles.css'
import { asset } from '../assets/assets';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const handleLogin = () => {
        return

    }

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
                        <h2 style={{ padding: "0" }}>Sign Up</h2>
                        <p>Create an account to access our services </p>
                        <Input type="text" className='inputField' placeholder='Enter your full name' />
                        <Input type="text" className='inputField' placeholder='Enter your Email' />
                        <Input.Password
                            className='inputField'
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                    

                        <button className="auth-btn" onClick={handleLogin}>Sign Up</button>
                        <p style={{margin:"5px 0"}}>Or</p>
                        <Button className="auth-btn2" onClick={handleLogin}> <img src={asset.googleIcon} alt="" style={{ width: 25, height: 25 }} /> Sign Up with Google</Button>


                        <p style={{ marginTop: "10px" }}>Already have an account? <Link to='/property-owner-login' style={{ color: "#fdb10e" }}>Sign In</Link></p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default SignUp

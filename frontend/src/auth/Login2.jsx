// eslint-disable-next-line no-unused-vars
import { Alert, Button, Checkbox, Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './styles.css'
import { asset } from '../assets/assets';
import { Link } from 'react-router-dom';

const Login2 = () => {
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
                        <h2 style={{ padding: "0" }}>Sign in</h2>
                        <p>Enter your credientials to access property panel </p>
                        <Input type="text" className='inputField' placeholder='Enter your Email' />
                        <Input.Password
                            className='inputField'
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        <div className="checkbox-container" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width: '100%', margin: '5px 0'}}>
                            <Checkbox>Remember me</Checkbox>
                            {/* <a href='#' style={{fontSize:13}}>Forgot Password?</a> */}
                        </div>

                        <button className="auth-btn" onClick={handleLogin}>Sign in</button>
                        <p style={{margin:"5px 0"}}>Or</p>
                        <Button className="auth-btn2" onClick={handleLogin}> <img src={asset.googleIcon} alt="" style={{ width: 25, height: 25 }} /> Sign in with Google</Button>

                        <p style={{marginTop: "10px"}}>Don&apos;t have an account? <Link to='/property-owner-signup' style={{color:"#fdb10e"}}>Sign Up</Link></p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login2

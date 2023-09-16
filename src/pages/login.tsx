import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './quizApp';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            email,
            password
        };

        try {
            const response = await axios.post(
                "https://important-lion-earrings.cyclic.app/auth/login",
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            );



            if (response.status === 200) {
                console.log('sessiontoken', response.data.Authentication.sessiontoken)
                localStorage.setItem('sessiontoken', response.data.Authentication.sessiontoken);

                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    theme: "colored"
                });

                navigate("/quizApp");
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    theme: "colored"
                });
                navigate("./login");
            }
        } catch (error: any) {
            if (error?.response) {
                toast.error(error?.response?.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    theme: "colored",
                });
            }
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Quiz app</h2>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;

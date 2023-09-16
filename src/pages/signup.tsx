import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login';
// import { navigate } from 'gatsby';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSignUp = async () => {
        const data = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post(
                "https://important-lion-earrings.cyclic.app/auth/register",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                theme: "colored"
            })

            if (response.status === 200) {
                // alert("successfully registered")

                navigate("/login");
            } else {
                alert("invalid credintials")
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    theme: "colored",
                });

                navigate("/signup.tsx");
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
        <div className="signup-container">
            <h2>Sign Up to Quiz app</h2>
            <form>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                <button type="button" onClick={handleSignUp}>
                    Sign Up
                </button>



            </form>
        </div >
    );
};

export default SignUp;

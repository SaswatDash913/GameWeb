import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userActions";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClipLoader"; 

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
          const response = await dispatch(login(formData, navigate));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="text" name="username" placeholder="Username" className="login-input" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="login-input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="login-input" onChange={handleChange} required />
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? <ClockLoader color="#fff" size={20} /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/userActions";
import "../style/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const [error,setError] = useState()
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", address: ""
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if (!file) {
            alert("Please upload a file!");
            return;
        }
        const message = dispatch(signup(formData,file,navigate));
        if(message)
        {
            setError("Failed!! please check your credentials")
        }
    };
    const handleLogin = () =>
    {
        navigate("/login")
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Signup</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input type="text" name="username" placeholder="Username" className="signup-input" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="signup-input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="signup-input" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" className="signup-input" onChange={handleChange} required />
                    <input type="file" className="signup-file-input" onChange={handleFileChange} required />
                    <p className="loginguide">already have an account</p>
                    <li className="Loginlink"onClick={handleLogin}>Login</li>
                    <button type="submit" className="signup-button">Signup</button>
                </form>
            </div>
            {error && (
                <p>{error}</p>
            )}
        </div>
    );
};

export default Signup;

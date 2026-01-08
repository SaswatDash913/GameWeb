import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Navbar.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/api/ver1/user"; 

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    const currentuser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/curent`, { withCredentials: true });
            setUser(response.data?.data); 
        } catch (error) {
            console.log(error.response?.data?.message || "Username finding failed!");
        }
    };

    useEffect(() => {
        currentuser(); 
    }, []);

    const HandleClickUser = () => {
        navigate("/profile")
    };

    const HandleClickLib = () => {
        navigate("/library")
    };

    const HandleClickStore = () => {
        navigate("/store")
    };

    return (
        <div className='navbar-main'>
            <div className='navbar-inner'>
                <div className='store'>
                    <button className='store-button-navbar' onClick={HandleClickStore}>Store</button>
                </div>
                <div className='library'>
                    <button className='library-button-library' onClick={HandleClickLib}>Library</button>
                </div>
                <div className='username'>
                    <button className='user-profile-navbar' onClick={HandleClickUser}>
                        {user ? user.username : "Guest"}
                    </button>
                </div>
            </div>
        </div>
    );
}

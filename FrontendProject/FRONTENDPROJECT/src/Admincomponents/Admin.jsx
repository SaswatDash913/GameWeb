import axios from 'axios';
import React, { useState } from 'react';
import '../style/Admin.css'

const BASE_URL = "https://gameweb-backend-tx4t.onrender.com/api/ver1/admin";

export default function Admin() {
    const [AdminformData, setAdminFormData] = useState({ AdminUser: "", AdminEmail: "", AdminPassword: "" });

    const Handlechange = (e) => {
        setAdminFormData({ ...AdminformData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/createadmin`, AdminformData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            console.log("Admin successfully created", response.data);
        } catch (error) {
            console.log("Error:", error.response?.data?.message || "Failed to create admin");
        }
    };

    return (
        <div className='main-admin-page'>
            <div className='main-admin-credentials'>
                <div className='credentials'>
                    <form className='form-admin' onSubmit={handleSubmit}>
                        <input className='input-admin-username' name="AdminUser" placeholder='Enter Admin username' onChange={Handlechange} value={AdminformData.AdminUser} />
                        <input className='input-admin-Email' name="AdminEmail" placeholder='Enter Admin Email' onChange={Handlechange} value={AdminformData.AdminEmail} />
                        <input className='input-admin-password' type="password" name="AdminPassword" placeholder='Enter Admin password' onChange={Handlechange} value={AdminformData.AdminPassword} />
                        <button className='button-submit-admindata' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

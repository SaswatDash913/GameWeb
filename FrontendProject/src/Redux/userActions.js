import axios from 'axios';
import { setUser, logoutUser } from './StoreSlice';
const BASE_URL = "https://gameweb-backend-tx4t.onrender.com/api/ver1"; 



export const signup = (formData,file,navigate) => async (dispatch) => {
    try {
        
        const data = new FormData()
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("address", formData.address);
        data.append("avatar", file); 
        const res = await axios.post(`${BASE_URL}/user/create`, data, {
            withCredentials: true, 
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(setUser({ user: res.data.user, accessToken: res.data.accessToken }));
        navigate('/login')

    } catch (error) {
        return error.response?.data?.message || "signup failed!";
    }
};

export const login = (userdata, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/user/login`, userdata, { withCredentials: true });
        dispatch(setUser({ user: res.data.data.user, accessToken: res.data.data.accessToken })); 
        navigate('/main');
    } catch (error) {
        return ("Login Failed:", error.response?.data?.message || "Login failed!");
    }
};



// export const logout = () => async (dispatch) => {
//     try {
//         await axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true });
//         dispatch(logoutUser());
//     } catch (error) {
//         alert(error.response?.data?.message || "Logout failed!");
//     }
// };


export const Change = async(oldpassword,newpassword)=>{
try {
    await axios.get(`${BASE_URL}/user/changepass`,{oldpassword,newpassword},{withCredentials:true})
    alert("password changed successfully")
} catch (error) {
    console.log("error :",error.response?.data?.message || "cannot change password")
}
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/profile.css'
import ClipLoader from 'react-spinners/ClipLoader';
const BASE_URL = "http://localhost:8080/api/ver1/user"; 

export default function Profile() {
    const [Nusername,setusername] = useState("")
    const [Nemail,setemail] = useState("")
    const [avatarurl,setavatarurl] = useState("")
    const LoadUserInfo = async()=>{
        try {
            const response = await axios.get(`${BASE_URL}/curent`,{withCredentials:true})
            setusername(response.data?.data?.username)
            setemail(response.data?.data?.email)
            setavatarurl(response.data?.data?.avatar)
            
        } catch (error) {
            console.log("error")
        }
    }
    useEffect(()=>{
        LoadUserInfo()
    },[])

  return (
    <div className='main-profilepage'>
        <div className='inner-profile'>
            <p className='username-profile'>{Nusername}</p>
            <p className='email-profile'>{Nemail}</p>
            <img src={avatarurl || <ClipLoader color='#fff' size={20} />} />
        </div>
    </div> 
  )
}
//the <img src = {avatarurl} will show warning as at first before loading it is a empty string to cancel out we write the null value
import React, { useEffect } from 'react';
import '../style/Payment.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/ver1";
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Paymentpage() {
  
   const {gameid} = useParams();
   const navigate = useNavigate()
   const[PriceTag,setPriceTag] = useState("")
   const [formData, setFormData] = useState({
          firstname: "",lastname:"", email: "", address:"",password: "",country:"",zip:""
    });


    const fetchgame = async() => {
      try {
        const response = await axios.get(`${BASE_URL}/game/curentgame/${gameid}`,{      
          withCredentials: true,
          headers: { "Content-Type": "application/json"},
        })
        console.log(response)
        setPriceTag(response?.data?.data?.game?.price)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchgame();
    },[])

    const HandleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const HandleSubmit = async(e) => {
      e.preventDefault(); 
      try {
        const response = await axios.post(`${BASE_URL}/payment/paymentcreate/${gameid}`,formData,{withCredentials:true})
        console.log(response)
        navigate("/store")
        
      } catch (error) {
        console.log("error",error)
      }
    }
  return (
    <div className='payment-page-main'>
      <div className='payment-inner'>
        <div className='user-details'>
          <div className='inner-data'>
            <h2 className='game-name-payment'></h2>
            <h2 className='price-data'></h2>
          </div>
          <form className='form-data-payment'onSubmit={HandleSubmit}>
            <input name='firstname' className='firstname-payment' placeholder='First Name' onChange={HandleChange}/>
            <input name='lastname'className='lastname-payment' placeholder='Last Name' onChange={HandleChange} />
            <input name='email'className='email-payment' placeholder='Email' onChange={HandleChange} />
            <input name='password'className='password-payment' placeholder='password' onChange={HandleChange}/>
            <input name='address'className='address-payment' placeholder='Address'onChange={HandleChange}/>
            <input name='country'className='country-payment' placeholder='Country' onChange={HandleChange}/>
            <input name='zip'className='zip-code' placeholder='Zip Code' onChange={HandleChange}/>
            <input name='upiId'className='upiid' type='email' placeholder='UPI ID' onChange={HandleChange}/>
            <p className='priceid'>${PriceTag}</p>
            <button className='pay-page'type='submit'>Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
const BASE_URL = "https://gameweb-backend-tx4t.onrender.com/api/ver1"; 


export const ordercreate = async(paymentdata,navigate) =>{
    try {
        const response = await axios.post(`${BASE_URL}/order/orderplacement`,paymentdata,{withCredentials:true})
        console.log(response)
    } catch (error) {
        console.log("error:",error)
    }
}

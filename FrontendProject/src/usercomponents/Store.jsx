import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../style/Store.css'

const BASE_URL = "https://gameweb-backend-tx4t.onrender.com/api/ver1";

export default function Store() {
  const [purchaseGameData, setPurchaseGameData] = useState([]);
  const [gameDetails, setGameDetails] = useState([]);
  const [rating,useRating] = useState(5);
  const [showPopUp, setShowPopUp]  = useState(false);
  const [review,setReview] = useState("")
  const [gameid,setGameid] = useState("")
  const[userid,setUserid] = useState("")
  const navigate  = useNavigate()

  const fetchPurchase = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/curent`, { withCredentials: true });
      console.log(response)
      const purchases = response?.data?.data?.purchasedGames || [];
      setUserid(response?.data?.data?._id)
      setPurchaseGameData(purchases);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGameDetails = async () => {
    try {
      const promises = purchaseGameData.map((item) =>
        axios.get(`${BASE_URL}/game/curentgame/${item._id}`, { withCredentials: true })
      );
      const responses = await Promise.all(promises);
      const details = responses.map((res) => res?.data?.data?.game); 
      setGameDetails(details);
      console.log(details)
    } catch (error) {
      console.error("Failed to fetch game details:", error);
    }
  };

  useEffect(() => {
    fetchPurchase();
  }, []);

  useEffect(() => {
    if (purchaseGameData.length > 0) {
      fetchGameDetails();
    }
  }, [purchaseGameData]);


  const handleDownload = () => {
    const linkPage = gameDetails[0].downloadLink
    navigate(linkPage)
    console.log(linkPage)
  }

  const handleGameIdselect = (game) => {
    setGameid(game)
    setShowPopUp(true)
  }

  const handlereview = () => {
    try {
      const response = axios.post(`${BASE_URL}/review/reviewcreate`,{user:userid,game:gameid,review},{withCredentials:true})
      console.log(response)
    } catch (error) {
      console.log("error at review",error)
    }
  }
  return (
    <div className='store-main'>
      <div className='store-inner'>
        {gameDetails.map((game) => (
          <div key={game._id}>
            <img className='purchasedGames-image' src={game.coverImage} alt="Game Cover" />
            <p>{game.title}</p>
            <button className='download-button'onClick={handleDownload}>Download</button>
            <button className='review-button' onClick={()=>handleGameIdselect(game._id)}> Leave a Review </button>
          </div>
        ))}
      </div>
      {showPopUp && ( 
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 className='heading-review'>Leave a Review</h3>
            <textarea
              className="review-input"
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <div className="popup-actions">
              <button onClick={handlereview} className='review-submit-btn'>Submit</button>
              <button onClick={() => setShowPopUp(false)} className='review-cancel-btn'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

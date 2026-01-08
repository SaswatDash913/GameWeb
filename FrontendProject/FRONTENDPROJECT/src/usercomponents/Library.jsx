import React, { useEffect } from "react";
import useLibrary from "../hooks/useLibrary";
import '../style/Library.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const BASE_URL = "http://localhost:8080/api/ver1"; 

export default function Library() {
  const allGames = useLibrary();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const currentuser = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/user/curent`, { withCredentials: true });
          setUser(response.data?.data); 
      } catch (error) {
          console.log(error.response?.data?.message || "Username finding failed!");
      }
  };
  useEffect(()=>{
    currentuser()
  },[])
  const HandleRemove = async (gameId) =>{
    try {
      const response = await axios.post(`${BASE_URL}/order/removeorder`,{ user: user._id, gamei: gameId },{withCredentials:true})
    } catch (error) {
      console.log(error);
    }
  }

  const handlepayment = (gameid) => {
    navigate(`/payment/${gameid}`)
  }

  return (
    <div className="library-main-div">
      <h2 className="my-library">Your Library</h2>

      <div className="library-inner">
        {allGames.length > 0 ? (
          allGames.map((entry) => (
            <div key={entry.game._id} className="game-card">
              <img src={entry.game.coverImage} alt={entry.game.title} className="library-image-user" />
              <h3 className="title-games-lib">{entry.game.title}</h3>
              <p className="descr-game-lib">{entry.game.description}</p>
              <p className="price-lib-games">${entry.game.price}</p>
              <button className="remove-order"onClick={()=>{HandleRemove(entry.game._id)}}>Remove</button>
              <button className="purchase-order"onClick={()=>{handlepayment(entry.game._id)}}>Buy</button>
            </div>
          ))
        ) : (
          <p>
            <ClipLoader color="#fff" size={20} />
          </p>
        )}
      </div>
    </div>
  );
}

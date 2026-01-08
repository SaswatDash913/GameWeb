import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../style/ProductPage.css";
import ClipLoader from "react-spinners/ClipLoader";


const BASE_URL = "http://localhost:8080/api/ver1";
const BASE_URL2 = "http://localhost:8080/api/ver1"

export default function ProductPage() {
  const { gameid } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[username1,setUsername] = useState("")
  const currentuser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/curent`, { withCredentials: true });
        setUsername(response.data?.data?._id);

    } catch (error) {
        console.log(error.response?.data?.message || "Username finding failed!");
    }
  };
  useEffect(() => {
      currentuser(); 
  }, []);
  const [gametitle, setGametitle] = useState("");
  const [gameprice, setGameprice] = useState("");
  const [gamedescr, setGamedescr] = useState("");
  const [gamecoverimg, setGamecoverimg] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/game/curentgame/${gameid}`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);
        setGametitle(response.data.data?.game?.title);
        setGameprice(response.data.data?.game?.price);
        setGamedescr(response.data.data?.game?.description);
        setGamecoverimg(response.data.data?.game?.coverImage);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [gameid]);

  const HandleLibrary = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/addtolib/${gameid}`,
        {}, 
        {
          withCredentials: true, 
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const handlereview = async () => {
    navigate(`/review/${gameid}`)
  };

  return (
    <div className="game-product-page">
      <div className="product-inner-section">
        <h1 className="title-game">{gametitle}</h1>
        <p className="game-price">${gameprice}</p>
        <p className="descr-game">{gamedescr}</p>
        <img src={gamecoverimg || <ClipLoader color="#fff" size={20}/>} alt="Game Cover" />
        <button className="Review-game"onClick={handlereview}>Reviews</button>
        <button className="library-game" onClick={HandleLibrary}>
          ADD to library!!
        </button>
      </div>
    </div>
  );
}

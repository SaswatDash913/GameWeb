import React from 'react';
import '../style/MainPage.css'
import '../style/MainPage.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import useFetchGames from '../hooks/useFetchGames';

export default function MainPage() {
  const navigate = useNavigate()
  const {games,error} = useFetchGames()
  const fetchGameDetails = async(gameid) =>{
      navigate(`/product/${gameid}`);  
  }
  return (
    <div className="main-page">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="sidebar">
        <button className="genre-btn">War</button>
        <button className="genre-btn">Action</button>
        <button className="genre-btn">FPS</button>
        <button className="genre-btn">PVP</button>
        <button className="genre-btn">Puzzle</button>
        <button className="genre-btn">Horror</button>
        <button className="genre-btn">Battle Royale</button>
        <button className="genre-btn">Sports</button>
      </div>
      <div className="carousel">
        <iframe src='https://www.youtube.com/embed/fYI7JHG9pOE?si=483FEZ8vQRy2aucW'className='carausal-video'></iframe>
      </div>
      <div className="main-content">
        <div className="game-section">
          <div className='game-section-inner'>
            {games.map((item)=>(
              <div key={item._id} className='game-page'onClick={() => fetchGameDetails(item._id)}>
                <img src={item.coverImage} className='gameimage'></img>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="category-section"></div>
      <div className="footer">
                     
      </div>
    </div>
  );
}

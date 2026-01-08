import React from 'react';
import useFetchGames from '../hooks/useFetchGames';
import '../style/Games.css'


export default function Games() {
    const { games, error } = useFetchGames();
    if (error) return <p>Error: {error}</p>; 
    return (
        <div className='allgames-main'>
            <div className='inner-gamesall'>
                {games.length > 0 ? (
                    games.map((item) => ( 
                        <div key={item._id} className='games-map'>
                            <p className='title-of-game'>{item.title}</p>
                            <img src={item.coverImage}></img>
                            <p className='price of the game'>{item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No games available</p> 
                )}
            </div>
        </div>
    );
}

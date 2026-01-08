import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/ver1";

const useFetchGames = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/game/games`, { withCredentials: true })
            .then((response) => {
                setGames(response.data.data?.games || []); 
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch games");
            });
    }, []);

    return { games, error };
};

export default useFetchGames;

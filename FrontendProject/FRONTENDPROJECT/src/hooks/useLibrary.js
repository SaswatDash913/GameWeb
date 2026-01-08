import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/ver1";

function useLibrary() {
    const [allGames, setAllGames] = useState([]);

  
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/allgames`, { withCredentials: true });
            setAllGames(response.data.data.Library || []);
        } catch (error) {
            console.error("Error fetching library:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return allGames; 
}


export default useLibrary;

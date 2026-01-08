import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = "https://gameweb-backend-tx4t.onrender.com/api/ver1/game";

export default function GameUpload() {
    const [Gamedata, setGamedata] = useState({
        uploader: "",
        title: "",
        description: "",
        genre: "",
        price: "",
        downloadLink: "",
    });

    const [cover, setCover] = useState(null);

    const HandleGameUpload = async (e) => {
        e.preventDefault();

        if (!cover) {
            console.log("Error: No file selected");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("uploader", Gamedata.uploader);
            formData.append("title", Gamedata.title);
            formData.append("description", Gamedata.description);
            formData.append("genre", Gamedata.genre);
            formData.append("price", Gamedata.price);
            formData.append("downloadLink", Gamedata.downloadLink);
            formData.append("coverImage", cover);

            const response = await axios.post(`${BASE_URL}/gamecreate`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Game uploaded successfully:", response.data);
        } catch (error) {
            console.log("Error:", error.response?.data?.message || "Failed to upload game");
        }
    };

    const handleChange = (e) => {
        setGamedata({ ...Gamedata, [e.target.name]: e.target.value });
    };

    const Handlefile = (e) => {
        setCover(e.target.files[0]);
    };

    return (
        <div className='main-game-upload'>
            <div className='gameupload-inner'>
                <form className='form-load' onSubmit={HandleGameUpload}>
                    <input className='input-uploader' name="uploader" placeholder='Admin ID' required onChange={handleChange} />
                    <input className='input-title' name="title" placeholder='Title' required onChange={handleChange} />
                    <input className='input-desc' name="description" placeholder='Description' required onChange={handleChange} />
                    <input className='input-genre' name="genre" placeholder='Genre' required onChange={handleChange} />
                    <input className='input-price' name="price" placeholder='Price' required onChange={handleChange} />
                    <input className='input-link' name="downloadLink" placeholder='Download Link' type='text' required onChange={handleChange} />
                    <input className='input-coverimage' type='file' required onChange={Handlefile} />
                    <button className='button-submit-game' type='submit'>Upload Game</button>
                </form>
            </div>
        </div>
    );
}

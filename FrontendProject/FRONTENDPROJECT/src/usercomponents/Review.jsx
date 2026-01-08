import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import '../style/Review.css'
import { useParams } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/api/ver1";


function Review() {

    const {gameid} =  useParams();
    const[Comment,setComments] = useState([])
    console.log(gameid)
    const[loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchReviews = async () => {
            try {
                const response =  await axios.get(`${BASE_URL}/review/getallreview/${gameid}`)
                console.log(response.data.data.ReviewsGame)
                setComments(response.data.data.ReviewsGame)
            } 
            catch (error) {
                console.log("Error in Frontend recievers!!",error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchReviews()
    },[gameid])
    
    return (
    <div className='review-main-page'>
        <div className='review-inner'>
            {loading ? (<p className='loading-data'>loading review</p>):(Comment.length == 0)?(<p className='no-comments'>no comments yet...</p>):
            (<div className='loaded-review'>
                {Comment.map((review,index)=>(
                    <div key={review._id || index}>
                        <h3 className='username-review'>Anonymous</h3>
                        <p className='review section'>{review.review}</p>
                    </div>
                ))}
            </div>)}
        </div>
    </div>
    )
}

export default Review
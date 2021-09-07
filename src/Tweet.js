// Our React imports
import React, {useState, useEffect} from "react";

// Icon imports
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'

// Tweet tweets={tweet}
const Tweet = ({tweets}) => {        
    const [like, setLike] = useState(false)
    
    const heartClicked = (e) =>{
        setLike(!like)
    }

    return(
        <div className="section-center">
            
            {tweets.map((tweetInfo) => {
                const {id, username, img, msg, likes} = tweetInfo
                return(
                    <div className="tweetPlacement" key={id}>
                        <img src={img} alt="Blank" />
                        <div className="text-tweet">
                            {username}
                            <p>{msg}</p>
                            <div className="icons-tweet">
                                <button className='like-button' onClick={heartClicked}>
                                    {like ?
                                        <FaHeart/>
                                        :
                                        <FaRegHeart/>
                                    }
                                    {likes}
                                </button>
                            </div>
                        </div>    
                        
                    </div>
                )
            })}
        </div>    
    )
}




export default Tweet
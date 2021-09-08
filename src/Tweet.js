// > This is a single Tweet. Editing one will not affect others
import React, {useState, useEffect} from "react";

// Icon imports
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

const Tweet = ({id, username, img, msg, likes}) => {        
    const heartClicked = (e) =>{
        setLike(!like)
        {like ? setHeart(hearts - 1) : setHeart(hearts + 1)}
    }
    
    const [like, setLike] = useState(false)

    const [hearts, setHeart] = useState(likes)

    return (
        <div className="tweetPlacement">
            <img src={img} alt="Blank" />
            
            <div className="text-tweet">
                <div className='userName'>{username}</div>
                
                <p>{msg}</p>
        
                <div className="icons-tweet">
                    <button className='like-button' onClick={heartClicked}>
                        {like ? <FcLike/>:<FaRegHeart/>}
                        {hearts}
                    </button>
                </div> 
            </div>
        </div>
    )
}

export default Tweet
// Default like position
import {FcLike} from 'react-icons/fc'

// Clicking on the like button makes it glow
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'

import React, {useState} from 'react'

const LikeButton = ({likeInfo}) => {
    
    // Extarct the info from likeInfo
    const {likes} = likeInfo

    const [hearts, setHearts] = useState(likes)


    const [like, setLike] = useState(false)
    
    const heartClicked = (e) => {
        setLike(!like)
        {like ? setHearts(hearts - 1) : setHearts(hearts + 1)}
    }    


    return(
        <div className="holdLikes">
            {like ? 
            <FcLike className='like-button' onClick={heartClicked}/>
            :
            <FaRegHeart className='like-button' onClick={heartClicked}/>} 
            <span className='heart-count'>{hearts}</span>
        </div>
        
    )
}


export default LikeButton
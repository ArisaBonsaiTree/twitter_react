// > This will allow us to render each Tweet individually and fix the like button problem

import React, {useState, useContext} from 'react'


// Default like position
import {FcLike} from 'react-icons/fc'

// Clicking on the like button makes it glow
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'
import { useGlobalContext } from "./context";

import { setData } from "./context";

import { Link } from "react-router-dom";

import LikeButton from './LikeButton';

const Tweets = ({tweets}) =>{

    const mapped = [...tweets].reverse().map(a => a)
    

    // const [like, setLike] = useState(...tweets)

    
    const {like, setLike, heartClicked} = useGlobalContext();
    

    
    return(
            <>  
                {/* {tweets.map((mapped)=>{ */}
                {mapped.map((mapped)=>{        
                    const {id, username, img, msg, likes} = mapped;                
                    return(
                        <div key={id} className="tweetPlacement">
                        <Link to={{pathname: `/profile/${id}`, state: {id, username, img, msg, likes} }}>
                            <img src={img} alt="Blank"/>
                        </Link>
                        
                
                        <div className="text-tweet">
                        <div className='userName'>
                            {/* You will need to edit Routes in App.js to allow this */}
                            <Link to={{pathname: `/profile/${id}`, state: {id, username, img, msg, likes} }}>{username}</Link>
                        </div>
                            <p>{msg}</p>
                            <div className="icons-tweet">
                                <LikeButton likeInfo={{likes}}/>
                                
                            </div> 
                        </div> 
                        </div>
                    )
                })}
            </>
    )
}


{/* <button className='like-button' onClick={heartClicked}>                      
                                    {like ? <FcLike/>:<FaRegHeart/>} 
                                    {likes}
                                    {hearts}  
                                </button> */}

export default Tweets

{/* <img src={img} alt="Blank"/>
                
                <div className="text-tweet">
                    <div className='userName'>{username}</div>
                    <p>{msg}</p>
                    
                    <div className="icons-tweet">
                        <button className='like-button' onClick={heartClicked}>
                            {like ? <FcLike/>:<FaRegHeart/>}
                            {hearts}
                        </button>
                        <Link to={`/profile/${id}`} onClick={setTweet} >View Profile</Link>
                    </div> 
                </div> */}
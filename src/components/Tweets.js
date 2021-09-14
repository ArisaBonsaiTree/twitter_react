// > This will allow us to render each Tweet individually and fix the like button problem

import React, {useState, useContext} from 'react'


// Default like position
import {FcLike} from 'react-icons/fc'

// Clicking on the like button makes it glow
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'
import { useGlobalContext } from "../context";

import { setData } from "../context";

import { Link } from "react-router-dom";


const Tweets = ({tweets}) =>{

    // const [like, setLike] = useState(false)
    // const [hearts, setHeart] = useState(likes)
    
    // const heartClicked = (e) =>{
    //     setLike(!like)
    //     {like ? setHeart(hearts - 1) : setHeart(hearts + 1)}
    // }

    // Reverse the map and pass it on below to render them
    const mapped = [...tweets].reverse().map(a => a)

    return(
            <>
                
                {/* {tweets.map((mapped)=>{ */}
                {mapped.map((mapped)=>{
                    const {id, title} = mapped;
                    return(
                        <div className="tweetPlacement">
                        {/* // <img src={img} alt="Blank"/> */}
                
                        <div className="text-tweet">
                        {/* <div className='userName'>{username}</div> */}
                            <p>{title}</p>
                        <Link to={`/profile/${id}`}View Profile/>
                            {/* <Link to={
                                    { 
                                        pathname: "/product/" + this.props.product.Id,
                                        myCustomProps: product
                                    }
                                }>
                                {Name}
                            </Link> */}
                            <div className="icons-tweet">
                                {/* <button className='like-button' onClick={heartClicked}> */}
                            {/* {like ? <FcLike/>:<FaRegHeart/>} */}
                            {/* {hearts} */}
                        {/* </button> */}
                        {/* <Link to={`/profile/${id}`} onClick={setTweet} >View Profile</Link> */}
                            </div> 
                        </div> 
                        </div>
                    )
                })}
            </>
    )
}


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
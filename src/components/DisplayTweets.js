import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react"; 

import { useGlobalContext } from "./context";
import data from '../data'
import Tweets from "./Tweets";


const DisplayTweets = (tweets) => {
    

const {accountNum} = tweets



const acc = data.filter((mikeFound)=>{
    return 'Mike' === mikeFound.username
})
console.log(tweets)

const findTweet = data.filter((search) => {
    return search.accountNum === tweets.accountNum
})
// console.log(findTweet)
// console.log(acc)
// console.log(acc[0])




    return(
        
        <>  
            


        {acc.length > 0 && (
        <div className='grocery-container'>
          <Tweets tweets={acc}/> 
        </div>
        )}    
            {/* {tweets.map((mapped)=>{ */}
            


            {/* {tweets.map((mapped)=>{        
                const {id, accountNum, username, handleName, img, msg, bgImg, profileText, likes} = mapped;                
                return(
                    
                    <h1>{username}</h1>
                )
            })} */}
        </>
)
}



export default DisplayTweets
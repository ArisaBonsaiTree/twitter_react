// > This will allow us to render each Tweet individually and fix the like button problem
import React from "react";
import Tweet from "./Tweet";

// We passed in tweets and we destructure it
const Tweets = ({tweets}) =>{
    return (      
        // This will have our Tweets lined up and together  
        <div>
            {tweets.map((tweetInfo)=>{
                return(
                    <Tweet 
                        key={tweetInfo.id} 
                        {...tweetInfo}
                    >
                </Tweet>                        
                )
            })}
        </div>
    )
}

export default Tweets
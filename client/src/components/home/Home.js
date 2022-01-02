// > This will be our home page and hold everything together
import React, {useState, useEffect, useContext} from "react";
import Tweet from './Tweet'
import {Link} from 'react-router-dom'

import TweetBox from './TweetBox'
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

import './Home.scss'

const Axios = require('axios')

function Home(){
    // * Where we store our Tweets and pass down 
    const [tweets, setTweets] = useState([])

    // * Where we store user info for future use
    const {user} = useContext(UserContext)
    
    useEffect(()=>{
        getTweets()
    }, [])

    // * Call the backend to get the Tweets
    async function getTweets(){
        const tweetResponse = await Axios.get(`${domain}/tweet`)
        setTweets(tweetResponse.data)
    }

    // * Display the newest Tweet on top
    function renderTweets(){
        let sortedTweets = [...tweets] // ? Place all of them, not just one
        
        // * Uses the date to determine the oldest/newest
        sortedTweets = sortedTweets.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        
        // * Calls the Tweet component with the info we sent
        return sortedTweets.map((tweet, i) => {
            return (
                <Tweet
                    key={i}
                    tweetData={tweet}
                    getTweetsFunction={getTweets}
                />
            )
        })
    }


    return(
        <div className="home">
            {
                user ? 
                <TweetBox
                    getTweetsFunction={getTweets} 
                /> 
                : 
                <p className='no-tweets-msg'>Please log in or register an account</p>
            }


            {
                tweets.length > 0 ? 
                renderTweets()
                : 
                // false && <p className='no-tweets-msg'>No Tweets have been added yet</p>
                user && <p className='no-tweets-msg'>No Tweets have been added yet</p>
            }
        </div>
    )
}

export default Home
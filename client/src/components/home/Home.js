// > This will be our home page and hold everything together
import React, {useState, useEffect, useContext} from "react";
import Tweet from './Tweet'
import './Home.scss'
import {Link} from 'react-router-dom'
import TweetBox from './TweetBox'
import UserContext from "../../context/UserContext";

const Axios = require('axios')


function Home(){
    const [tweets, setTweets] = useState([])

    const {user, setContextUsername} = useContext(UserContext)

    

    useEffect(()=>{
        getTweets()
    }, [])


    async function getTweets(){
        // * Where we set Object {id, header, message, user...}
        // ? Now we populated the data and have the username inserted
        const tweetRes = await Axios.get('http://localhost:5000/tweet')
        setTweets(tweetRes.data)
        
    }

    // * Order our Tweets to have the newest Tweets on top
    function renderTweets(){
        let sortedTweets = [...tweets]
        sortedTweets = sortedTweets.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        
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
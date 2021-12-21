// > This will be our home page and hold everything together
import React, {useState, useEffect, useContext} from "react";
import Tweet from './Tweet'
import './Home.scss'
// import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'
import TweetMe from './TweetMe'

const Axios = require('axios')


function Home(){
    const [tweets, setTweets] = useState([])

    useEffect(()=>{
        getTweets()
    }, [])


    async function getTweets(){
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
            <TweetMe
                getTweetsFunction={getTweets}
            />


            {tweets.length > 0 ? renderTweets()
            : false && <p className='no-tweets-msg'>No Tweets have been added yet</p>
            }
        </div>
    )
}

export default Home
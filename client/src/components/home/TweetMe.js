import React, {useState, useEffect} from "react";
import './TweetMe.scss'

const Axios = require('axios')

function TweetMe({getTweetsFunction}) {
    
    const[tweetHeader, setTweetHeader] = useState('')
    const[tweetMessage, setTweetMessage] = useState('')

    const [didSubmit, setDidSubmit] = useState(false)

    useEffect(()=>{
        setTweetHeader('')
        setTweetMessage('')
        setDidSubmit(false)
    }, [didSubmit])

    async function submitTweet(e){
        e.preventDefault()

        console.log('I work')
        const tweetData = {
            header: tweetHeader,
            message: tweetMessage
        }
        
        try{
            await Axios.post('http://localhost:5000/tweet', tweetData)
            setDidSubmit(true)
        }catch(err){
            console.log('ERROR')
            return
        }

        getTweetsFunction()
    }
    
    return  (
        <div className="tweet-div">
            <form className='form' onSubmit={submitTweet}>
                <input 
                    placeholder="Header"
                    id='tweet-header' 
                    type="text" 
                    value={tweetHeader} 
                    onChange={(e)=> setTweetHeader(e.target.value)}
                />
                <input
                    id='tweet-message' 
                    value={tweetMessage} 
                    placeholder="What's happening?"
                    onChange={(e)=> setTweetMessage(e.target.value)}
                />

                <button className='btn-submit' type='submit'>Tweet</button>
            </form>
        </div>
    )
};

export default TweetMe;
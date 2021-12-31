import React, {useState, useEffect, useContext} from "react";
import './TweetBox.scss'
import UserContext from "../../context/UserContext";

const Axios = require('axios')

function TweetBox({getTweetsFunction}) {
    
    const[tweetMessage, setTweetMessage] = useState('')

    const [didSubmit, setDidSubmit] = useState(false)
    
    const {user} = useContext(UserContext)
    

    useEffect(()=>{
        setTweetMessage('')
        setDidSubmit(false)
    }, [didSubmit])

    async function submitTweet(e){
        e.preventDefault()
        console.log(user)
        const tweetData = {
            header: user,
            message: tweetMessage
        }
        
        try{
            await Axios.post('http://localhost:5000/tweet', tweetData)
            setDidSubmit(true)
        }catch(err){
            return
        }

        getTweetsFunction()
    }
    
    return  (
        <div className="tweet-div">
            <form className='form' onSubmit={submitTweet}>
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

export default TweetBox;
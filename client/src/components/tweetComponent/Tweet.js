// > The Tweet object that we broke apart to give it its own function
import Axios from 'axios'
import React, {useContext, useEffect} from 'react'

import UserContext from '../../context/UserContext'

import './Tweet.scss'

function Tweet({tweetData, getTweetsFunction}){
    
    const {user} = useContext(UserContext)
    
    // ? Why userId??? Where did that come from?
    // * Look at Tweet model and you will see userId, which we populated

    async function deleteTweet(){
        if(window.confirm('Do you want to delete this Tweet?')){
            await Axios.delete(`http://localhost:5000/tweet/${tweetData._id}`)
        }
        getTweetsFunction()
    }
    
    // ? Go to tweetRouter.js > router.get('/') to populate Tweets and display user attributes
    return(
        <div className="tweet">
            
            <div className="tweet-image-area">
                <img className='tweet-pfp' src={tweetData.userId.profilePicture}/>
            </div>
            
            <div className="tweet-text-area">
                <div className="header">
                    <span className='username'>{tweetData.userId.username}</span>
                    <span className='handleName'>@{tweetData.userId.username}</span>
                </div>
                
                <div className="message">
                    {tweetData.message}
                </div>
                
                <div className="likesMisc">

                </div>
                
                
            </div>
            
            
            
            
            {user && (
                user.username === tweetData.userId.username &&
                    (
                        <button className='btn-delete' onClick={deleteTweet}>Delete</button>
                    )
            )}
            
        </div>
    )
}

export default Tweet
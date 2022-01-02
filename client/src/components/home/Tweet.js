// > The Tweet object that we broke apart to give it its own function
import Axios from 'axios'
import React, {useContext, useEffect} from 'react'

import UserContext from '../../context/UserContext'

import './Tweet.scss'

function Tweet({tweetData, getTweetsFunction}){
    
    const {user} = useContext(UserContext)
    
    // ! FIX LATER
    async function deleteTweet(){
        if(window.confirm('Do you want to delete this Tweet?')){
            await Axios.delete(`http://localhost:5000/tweet/${tweetData._id}`)
        }
        getTweetsFunction()
    }
    
    // TODO: Fix the login and register page before fixing this
    return(
        <div className="tweet">
            {<h2 className='header'>@{tweetData.userId.username}</h2>}
            
            {tweetData.message && <p className='message'>{tweetData.message}</p>}
            
            {/* {user.id === tweetData.userId._id && (
                <button className='btn-delete' onClick={deleteTweet}>Delete</button>
            )} */}
            {console.log(tweetData.userId._id)}
            
        </div>
    )
}

export default Tweet
import Axios from 'axios'
import React from 'react'

import './Tweet.scss'

function Tweet({tweetData, getTweetsFunction}){
    async function deleteTweet(){
        if(window.confirm('Do you want to delete this Tweet?')){
            await Axios.delete(`http://localhost:3000/tweet/${tweetData._id}`)
        }

        getTweetsFunction()
    }


    return(
        <div className="tweet">
            {tweetData.header && <h2 className='header'>{tweetData.header}</h2>}
            {tweetData.message && <p className='message'>{tweetData.message}</p>}
        </div>
    )
}

export default Tweet
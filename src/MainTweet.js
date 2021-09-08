// > First objective, display the tweets [DONE]
// > Allow me to post new tweets
// > Allow me to press like on a tweet [DONE]
// > Make it look nice
// > Allow me to comment to a tweet New page??? [EXTRA]
// * React componenets and hooks that we can use for the project

// > Refer to Menu project to render updated tweets
import React, {useState, useEffect} from "react";

// * Hard coded the tweets 
import data from './data'

import Tweets from './Tweets'

import Tweet from "./Tweet";

import Sidebar from "./Sidebar";

import {GrImage} from 'react-icons/gr'
import {AiOutlineGif} from 'react-icons/ai'

const MainTweet = () => {
  // Where we will pass and save our data 
  // ^ Should add useEffect later to have it in sync!!!
  const [tweets, setTweet] = useState(data)

  const [msg, setMsg] = useState()

  const handleSubmit = (e) => {
    const newTweet = {
      id: '20', 
      username: 'Barbara2',
      img: '/Images/lumine.png',
      msg: 'How do I cook?',
      likes: 0
    }
    
  }


  // Idea one, render each tweet and add to it


  // * This is what will render in our App
  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>Home</h3>
        <div className="form-control">
          <img className='pfp' src='/Images/lumine.png' alt="" />
          <input 
            type="text" 
            className='grocery' 
            placeholder="What's happening?"
            value={msg}
            onChange={(e)=> setMsg(e.target.value)}
          />
          
        </div>
        <div className='userIcons'>
          <GrImage/>
          <button type='submit' className='submit-btn'>Tweet</button>
        </div>
      </form>
      <Tweets tweets={tweets}/>
    </section>
    
  );
}

export default MainTweet;

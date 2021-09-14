import React, {useState, useEffect} from "react"; 
import data from '../data'
import Tweets from './Tweets'
import {GrImage} from 'react-icons/gr'

// ? Random user API ~~ Could use later
const url = 'https://randomuser.me/api/'


// ? Allows us to store the Data in localStorage to save the Tweets
const getLocalStorage = () => {
  let list = localStorage.getItem('list')

  // * If a list exist, it will print the items in the list category
  if(list){
      return JSON.parse(localStorage.getItem('list'))
  }
  else{
      return []
  }
}

const TweetList = () => {
  // const [tweets, setTweet] = useState(data)
  // ? Hard codeded the tweets
  const [hardCodedTweets, setHardCodedTweets] = useState(data)


  // ? Message is what we are displaying 
  const [msg, setMsg] = useState('')

  // ? Stores our Tweets at the moment
  const [tweets, setTweets] = useState(getLocalStorage)
  
  
  // ? Allows you to change the button while editing
  const [isEditing, setIsEditing] = useState(false)

  const [editID, setEditID] = useState(null)

  //* Update the local storage when we update list
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(tweets))
    // setTweets([])
    console.log('I am called')
  },[tweets])

  
  const removeTweets = () => {
    setTweets([])
  }

  // Use this for the Hard coded tweets
  
  
  const tweetTheFiles = () => {
    hardCodedTweets.map((item)=>{
      const newItem = {id: item.id, title: item.msg}
      // ! Add Delay to useState
      setTweets(tweets => ([...tweets, newItem]))
    })
    

    // for(let i = 0; i < 7; i++){
    //   let newItem = {id: hardCodedTweets[i].id, title: hardCodedTweets[i].msg}
    //   // ! Solution to allow us to set more tweets
    //   // ? However, if you want to merge the response with the previously existing values, 
    //   // ? you must use the callback syntax of state updation along with the correct use of spread syntax like
      
    //   setTweets(tweets => ([...tweets, newItem]))
    // }
  }
  


  //? Add a new item to the list of list
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Name is what we are getting and sending title is the official name
    const newItem = {id: new Date().getTime().toString(), title: msg};
    setTweets([...tweets, newItem])
    setMsg('')
  } 

  // > Current Objective, be able to Tweet
  // * This is what will render in our App
  return (
    //? User Input for the Tweet
    <section className="section-center">
      
      <button onClick={tweetTheFiles}>Add the hardcoded Tweets</button>
      <button onClick={removeTweets}>Delete the Tweets</button>

      <form className='tweet-form' onSubmit={handleSubmit}>
        <h3>Home</h3>

        <div className="form-control">
          <img className='pfp' src='/Images/lumine.png' alt="" />
          <input 
            type="text" 
            className='input-style' 
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
      
      {/* DISPLAY THE TWEETS */}
      {tweets.length > 0 && (
        <div className='grocery-container'>
          <Tweets tweets={tweets}/> 
        </div>
      )}
    </section>
  );
}

export default TweetList;

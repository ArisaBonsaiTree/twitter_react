// > First objective, display the tweets
// > Allow me to post new tweets
// > Allow me to press like on a tweet
// > Make it look nice
// > Allow me to comment to a tweet New page??? [EXTRA]
// * React componenets and hooks that we can use for the project
import React, {useState, useEffect} from "react";


// * Hard coded the tweets 
import data from './data'

import Tweet from './Tweet'


function App() {
  const [tweet, setTweet] = useState(data)

  const handleSubmit = (e) => {
    e.preventDefault()
  }




  // * This is what will render in our App
  return (
    <section className='section-center'>
      <form className='tweet-form' onSubmit={handleSubmit}>
        <h3>Home</h3>
        <div className="form-control">
          <input type="text" className='tweet' placeholder="What's happening?"/>
          <button type='submit' className='submit-btn'>
            Tweet
          </button>
        </div>
      </form>

      <div className="tweet-container">
        <Tweet tweets={tweet}/>
      </div>

    </section>
  );
}

export default App;

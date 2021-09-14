// Global functions
import React, {useState, useContext} from 'react'


// Default like position
import {FcLike} from 'react-icons/fc'

// Clicking on the like button makes it glow
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'


// ? Needed to create Context
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [test, setTest] = useState(false)

    // ? Pass in the id, username, img, msg, and likes
    const TweetGlobal = ({id, username, img, msg, likes}) => {        
        
        // ? If the button has been pressed 
        const [like, setLike] = useState(false)

        // ? The amount of likes you get
        const [hearts, setHeart] = useState(likes)
        
        
        // ? When you click on the like button
        const heartClicked = (e) =>{
            setLike(!like)
            {like ? setHeart(hearts - 1) : setHeart(hearts + 1)}
        }
        
        // ? Render the information we gave it
        // * Create the Tweet for us
        return (
            <div className="tweetPlacement">
                <img src={img} alt="Blank" />
                
                <div className="text-tweet">
                    <div className='userName'>{username}</div>
                    <p>{msg}</p>
                    
                    <div className="icons-tweet">
                        <button className='like-button' onClick={heartClicked}>
                            {like ? <FcLike/>:<FaRegHeart/>}
                            {hearts}
                        </button>
                    </div> 
                </div>
            </div>
        )
    }

    return (
        <AppContext.Provider
            value={{
                TweetGlobal
            }}>
                {children}
            </AppContext.Provider>

    )


}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

//^ How do we use it?
//^ const {getConstFunction} = useGlobalContext()
// Global functions
import React, {useState, useContext} from 'react'


// Default like position
import {FcLike} from 'react-icons/fc'

// Clicking on the like button makes it glow
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa'


// ? Needed to create Context
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    
    const [like, setLike] = useState(false)


    const [myID, setMyId] = useState(null)
    
    // ? Use this to allow you to go to your profile
    const [mainAccount, setMainAccount] = useState({
            id: 29,
            accountNum: 29,
            username: 'barbaraJr2',
            handleName: '@barbaraJr2',
            img: '/Images/lumine.png', 
            bgImg: '/Images/backGround.jpeg',
            msg: 'PlaceHolder',
            profileText: 'Learning how to code and hopefully can complete 100 days of code',
            likes: 0
        }
    )

    const heartClicked = (e) => {
        setLike(!like)
    }    
    



    return (
        <AppContext.Provider
            value={{
                FaRegComment,
                FaRegHeart,
                FaHeart,
                like,
                setLike,
                heartClicked,
                myID,
                setMyId,
                mainAccount, 
                setMainAccount
            }}>
                {children}
            </AppContext.Provider>
    )


}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
//^ How do we use it?
//^ const {getConstFunction} = useGlobalContext()

//^ import { AppContext, useGlobalContext } from './context'
//^ const {isModalOpen, closeModal} = useGlobalContext() 
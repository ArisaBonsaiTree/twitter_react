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
                heartClicked
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
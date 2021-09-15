import React from 'react';

import { FaTimes, FaUserFriends } from 'react-icons/fa'
import { social, links } from '../dataIcons'
import { FaTwitter } from 'react-icons/fa'
import { FaFeatherAlt } from 'react-icons/fa'

import {AiOutlineHome, AiFillHome} from 'react-icons/ai'

import {AiOutlineUser} from 'react-icons/ai'
import {FaUserAlt} from 'react-icons/fa'

import {HiOutlineUser} from 'react-icons/hi'
import {ImUser} from 'react-icons/im'



import { AppContext, useGlobalContext } from './context'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const {mainAccount, setMainAccount, homePage, setHomePage, profilePage, setProfilePage} = useGlobalContext()
    // const {setHomePage, setProfilePage} = useGlobalContext()

    const {id, accountNum, username, handleName, img, msg, bgImg, profileText, likes} = mainAccount;
    return (



    // show-sidebar is the toggle
    // <div className='section-start'>
    <div className="social-icons">
        <ul>
            <li>
                <a href="/">
                    <FaTwitter className='twitter-icon'href="/"/>
                </a>
            </li>

            <li>            
                {homePage ? <AiFillHome className='home-btn'/> : <AiOutlineHome className='home-btn'/>}
                <a href="/">Home</a>
            </li>
            <li>
                {profilePage ? <ImUser className='profile-btn'/> : <HiOutlineUser className='profile-btn'/>}
                {/* <FaUserFriends className='profile-btn'/> */}
                <Link to={{pathname: `/profile/${accountNum}`, 
                    state: {id, accountNum, username, handleName, img, msg, bgImg, profileText, likes} }}>
                    Profile
                </Link>
                
            </li>
        </ul>
            
    </div>
    )
}

export default Sidebar



// {links.map((link)=>{
//     const {id, url, text, icon} = link
//     return (
//         <div className="links">
//             {/* key={id} */}
//             <li>
//                 <a href={url}>{icon} {text}</a>
//             </li>
//         </div>
//     )
// })}
// <FaFeatherAlt className='feather-icon'/>
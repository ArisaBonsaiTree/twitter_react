import React from 'react';

import { FaTimes, FaUserFriends } from 'react-icons/fa'
import { social, links } from '../dataIcons'
import { FaTwitter } from 'react-icons/fa'
import { FaFeatherAlt } from 'react-icons/fa'

import {AiOutlineHome} from 'react-icons/ai'

import { AppContext, useGlobalContext } from './context'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const {mainAccount, setMainAccount} = useGlobalContext()
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
                <AiOutlineHome className='home-btn'/>
                <a href="/"> Home</a>
            </li>
            <li>
                <FaUserFriends className='profile-btn'/>
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
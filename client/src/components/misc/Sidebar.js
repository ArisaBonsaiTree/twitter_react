import Axios from 'axios'
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'

import domain from '../../util/domain'

import './Sidebar.scss'

function Sidebar(){
    return (
        <div className='sidebar'>
            Test
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
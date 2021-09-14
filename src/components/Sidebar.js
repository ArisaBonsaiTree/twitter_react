import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { social, links } from '../dataIcons'
import { FaTwitter } from 'react-icons/fa'
import { FaFeatherAlt } from 'react-icons/fa'

const Sidebar = () => {
    return (
    // show-sidebar is the toggle
    <div className='section-start'>
        <ul className='social-icons'>
                <FaTwitter className='twitter-icon'/>
                {links.map((link)=>{
                    
                    const {id, url, text, icon} = link
                    return <li className='links' 
                    key={id}>
                    <a href={url}>
                        {icon}
                    </a>
                    </li>
                })}
                <FaFeatherAlt className='feather-icon'/>
        </ul>
    </div>
    )
}

export default Sidebar

import Axios from 'axios'
import React, {memo, useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'

import './Sidebar.scss'



function Sidebar(){
    // TODO : PLACE THE USER OBJECT IN THE USER CONTEXT SO WE CAN NARROW IT
    const {user, getUser} = useContext(UserContext)


    async function logout(){
        console.log(user)
        await Axios.get(`${domain}/auth/logout`)
        await getUser()
    }

    
    return (
        <div className='sidebar'>
            <div className='displayList'>
                <p>Icon</p>
                <p>Home</p>
                <p>Explore</p>
                <p>Notifications</p>
                <p>Messages</p>
                <p>Profile</p>
            </div>
            
            
            <div className='authList'>
                
                {user === null ? (
                    <p>
                        <Link to='register' className='register'>Register</Link>
                        /
                        <Link to='login' className='login'>Login</Link>
                    </p>
                ):(
                    
                    user && <button className='btn-logout' onClick={logout}>Log out</button>
                )}


            </div>
        </div>
    )
    // ! Fix re-rendering problerm!!!
}

export default memo(Sidebar)
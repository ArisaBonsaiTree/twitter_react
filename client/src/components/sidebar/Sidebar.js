import Axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Link, Navigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'
import Register from '../auth/Register'

import './Sidebar.scss'



function Sidebar(){

    // TODO : PLACE THE USER OBJECT IN THE USER CONTEXT SO WE CAN NARROW IT
    const {user, getUser} = useContext(UserContext)

    const navigate = useNavigate()

    async function logout(){
        await Axios.get(`${domain}/auth/logout`)
        await getUser()
        navigate('/')
    }

    
    return (
        <div className='sidebar'>
            <div className='displayList'>
                <p>Icon</p>



                <p>
                    <Link to='/' className='home-link'>Home</Link>
                </p>
                
                
                <p>Explore</p>
                <p>Notifications</p>
                <p>Messages</p>
                
                <p>
                    {user === null || user.username === null ? (
                        // <Link to={`/profile/`} className='profile-link'>Profile</Link>
                        <Link to='register' className='register-an-account'>Profile</Link>
                    ): (
                        <Link to={`/profile/${user.username}`} className='profile-link'>Profile</Link>
                    )}
                    
                </p>

            </div>
            
            
            <div className='authList'>
                
                {user === null || user.username === null? (
                    <p>
                        <Link to='register' className='register'>Register</Link>
                        /
                        <Link to='login' className='login'>Login</Link>
                    </p>
                ):(
                    user && 
                        <button className='btn-logout' onClick={logout}>
                            <p><span className='logout-username'>{user.username}</span>Log out</p>
                        </button>
                )}
            </div>
        </div>
    )
}

export default Sidebar
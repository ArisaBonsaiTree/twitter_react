import Axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Link, Navigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'
import Register from '../auth/Register'

import './Sidebar.scss'

import {BsTwitter, BsBell, BsEnvelopeOpen, BsPersonFill} from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
import {HiOutlineHashtag} from 'react-icons/hi'

function Sidebar(){
    const navigate = useNavigate()    
    const {user, getUser} = useContext(UserContext)

    async function logout(){
        await Axios.get(`${domain}/auth/logout`)
        await getUser()
        navigate('/')
    }
    
    return (
        <div className='entire-sidebar'>
            
            <div className='sidebar-icons'>
                <div className="sidebar-bird">
                    <BsTwitter/>
                </div>
                
                <div className="sidebar-home">
                    <p>
                        <Link to='/' className='home-link'><FaHome/><span>Home</span></Link> 
                    </p>
                </div>

                <div className="sidebar-explore">
                    <p>
                        <HiOutlineHashtag/> <span>Explore</span>
                    </p>
                </div>

                <div className="sidebar-notifications">
                    <p>
                        <BsBell/> <span>Notifications</span>
                    </p>
                </div>
                
                <div className="sidebar-messages">
                    <p>
                        <BsEnvelopeOpen/><span>Messages</span>
                    </p>
                </div>
                
                <p>
                    {user === null || user.username === null ? (
                        // <Link to={`/profile/`} className='profile-link'>Profile</Link>
                        <Link to='register' className='profile-link'><BsPersonFill/><span>Profile</span></Link>
                    ): (
                        <Link to={`/profile/${user.username}`} className='profile-link'>Profile</Link>
                    )}
                    
                </p>

                <div className="sidebar-tweet-div">
                    <p>
                        <button className='sidebar-tweet-btn'>
                            <span>
                                Tweet    
                            </span>
                        </button>
                    </p>
                </div>
            </div>
            
            
            <div className='sidebar-authlist'>
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
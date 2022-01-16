import Axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Link, Navigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'
import Register from '../auth/Register'

import './Sidebar.scss'

import {BsTwitter, BsBell, BsEnvelopeOpen, BsPersonFill, BsPerson} from 'react-icons/bs'
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
            
            <div className='sidebar-interactive'>
                
                <div className='icons'>
                    <Link to='/' className='home-link'><FaHome className='icon'/><span>Home</span></Link> 

                    {user === null || user.username === null ? 
                        (
                        <Link to='register' className='profile-link'>
                                <BsPerson className='icon'/><span>Profile</span>                            
                        </Link>
                        )
                        : 
                        (
                            <Link to={`/profile/${user.username}`} className='profile-link'><BsPerson  className='icon'/><span>Profile</span></Link>   
                    )}
                </div>
                
            </div>
            
            
            <div className='sidebar-authlist'>
                {user === null || user.username === null? (
                    <>
                        <div className="register-area">
                            <p>Join today</p>
                            <Link to='register' className='register'>Sign up with email</Link>
                        </div>
                        <div className="login-area">
                            <p>Already have an account?</p>
                            <Link to='login' className='login'>
                                Sign in
                            </Link>    
                        </div>            
                    </>
                    
                ):(
                    <div className="log-out-area">
                        {user && 
                            <div className="mini-user-area">
                                
                                <div className="mini-pfp">
                                    <img src={user.profilePicture} alt="" />
                                </div>


                                <div className="mini-user-info">
                                    <div className="username-section">
                                        <span className='logout-username'>@{user.username}</span>
                                    </div>
                                    <div className="mini-logout">
                                        <button className='btn-logout' onClick={logout}>
                                            <p>Log out</p>
                                        </button>    
                                    </div>
                                </div>
                                
                            </div>
                            
                        }
                    </div>
                    
                    
                )}
            </div>

        </div>
    )
}

export default Sidebar
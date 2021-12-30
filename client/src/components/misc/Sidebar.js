import Axios from 'axios'
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'

import './Sidebar.scss'



function Sidebar(){
    
    const {user, getUser} = useContext(UserContext)

    async function logout(){
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
                {
                user ? 
                    <p className='userDisplay'>
                        {user}
                        <button className='btn-logout' onClick={logout}>Log out</button>
                    </p>
                    :
                    <p>
                        <Link to='register' className='register'>Register</Link>
                        /
                        <Link to='login' className='login'>Login</Link>
                    </p>
                }
            </div>
        </div>
    )
}

export default Sidebar
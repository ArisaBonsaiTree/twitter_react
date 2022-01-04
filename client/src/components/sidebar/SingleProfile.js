import React, {useState, useEffect, createContext} from 'react';

import './SingleProfile.scss'
import './EditFormSingleProfile.scss'

function SingleProfile({userData}) {
    
    const [bool, setBool] = useState(false)

    const [edit, setEdit] = useState(false)

    function editPopup(){ 
        setEdit(!edit)

    }
    
    
    
    return  (
        <section className='profile-section'>
            <div className='profile-background-area'>
                <img className='profile-background-img' src={userData.profileBanner} alt='' />
            
            </div>

            <div className='profile-picture-section'>
                <img className='profile-picture' src={userData.profilePicture} alt='' />
                <button onClick={()=>{editPopup()}}>Edit profile</button>
            </div>

            <div className='profile-info-section'>
                <div className="profile-name">
                    <span className='name'>{userData.username}</span>
                    <span>@{userData.username}</span>
                </div>

                <div className='profile-text-section'>
                    <p>Hoping to complete 100 days of code</p>
                    <p>Joined [Find the data later]</p>
                </div>
                
                <div className='follow-following-section'>
                    <p>0 Following 0 Followers</p>
                </div>
            </div>

            

            

            <div className='display-tweets-section'>

            </div>

            {!edit ? <></> : 
            <section className='edit-form'>
                <div className="edit-box">
                    <div className="top-of-box">
                        <button onClick={()=>{editPopup()}}>X</button>
                        <span>Edit Profile</span>
                        <button onClick={()=>{editPopup()}}>Save</button>
                    </div>                        
                </div>                        
            </section>
            }        
    </section>
    
    )
};

export default SingleProfile;
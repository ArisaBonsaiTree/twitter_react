import React from "react";
import { useParams, Link, useLocation } from "react-router";
import data from '../data'
import Sidebar from '../components/Sidebar'

// id, accountNum, username, handleName, img, msg, profileText, likes
const SingleProfile = (props) =>{
    const location = useLocation()
    

    const [tweet, setTweet] = React.useState(null)
    
    

    React.useEffect(()=>{
        function getTweet(){
            console.log(data[0])
        }
    })
    
    
    
    return(
        <>
            <Sidebar/>
        
            <section className="single-section-center">
                <div className="background-picture">
                    <img src={location.state.bgImg} alt="Hello" />
                </div>
                <div className="profile-picture">
                    <img src={location.state.img} alt="" />
                </div>
                <div className="profile-info">
                    <h4>{location.state.username}</h4>
                    <h5>{location.state.handleName}</h5>
                </div>
                <div className="profile-text">
                    <p>{location.state.profileText}</p>
                </div>
                <div className="following-followers">
                    <p>0 Following  0 Followers</p>
                </div>
                <div className="tweets-display">
                    
                </div>                
            </section>
        </>
    )
}

export default SingleProfile
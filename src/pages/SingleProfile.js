import React from "react";
import { useParams, Link, useLocation } from "react-router";
import data from '../data'
import Sidebar from '../components/Sidebar'

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
                    <img src='/Images/backGround.jpeg' alt="Hello" />
                </div>
                <div className="profile-picture">
                    <img src={location.state.img} alt="" />
                </div>
                <div className="profile-info">
                    <h4>{location.state.username}</h4>
                    <h5>@{location.state.username}</h5>
                </div>
                <div className="following-followers">

                </div>
                <div className="tweets-display">

                </div>
                
                <h1>Welcome</h1>
                <h2>{location.state.msg}</h2>        
            </section>
        </>
    )
}

export default SingleProfile
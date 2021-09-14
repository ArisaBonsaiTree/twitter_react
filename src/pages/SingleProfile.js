import React from "react";
import { useParams, Link } from "react-router";
import data from '../data'


const SingleProfile = () =>{
    // const {id} = useParams()
    const [tweet, setTweet] = React.useState(null)

    React.useEffect(()=>{
        function getTweet(){
            console.log(data[0])
        }
    })
    
    
    return(
        <>
        
            <h1>Welcome</h1>
            
            
        </>
    )
}

export default SingleProfile
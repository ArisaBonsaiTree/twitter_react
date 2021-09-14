import React from "react";
import TweetList from "../components/TweetList";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return(
        <section className='container'>
            <Sidebar/>
            <TweetList/>
        </section>
    )
}

export default Home
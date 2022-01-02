// > Global [Instance class] that gives us access to variables for our entire application
// ? useContext is the highest parent component that reduces the usage of 'prop drilling'

import React, { createContext, useEffect, useState } from "react";

import domain from '../util/domain'

const Axios = require('axios')

const UserContext = createContext()

function UserContextProvider(props) {    
    const [user, setUser] = useState(undefined)

    async function getUser(){
        // ? We get res.json(validatedUser.id) 
        const userRes = await Axios.get(`${domain}/auth/loggedIn`)
        
        // setUser(userRes.data.userId)
        // ? We get Object {userId: 1231132312132}
        // * Now that user is set we can access it through out the app
        setUser(userRes.data)

    }

    
    // * When we load the app, we get the user and set it [If we login / register it will rerender]
    useEffect(()=>{
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{user, getUser}}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContext
export {UserContextProvider}
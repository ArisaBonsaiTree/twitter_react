// > Global [Instance class] that gives us access to variables for our entire application

import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext()

function UserContextProvider(props) {    
    return (
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContext
export {UserContextProvider}
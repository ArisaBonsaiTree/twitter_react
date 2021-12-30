import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/misc/Sidebar";

import Home from "./components/home/Home";

import Register from "./components/auth/Register";
import Login from './components/auth/Login'

function RouterPage() {
    return  (
        <BrowserRouter>
            <Sidebar/>
            
            <Routes>
                <Route exact path='/' element={
                    <Home/>
                }/>

                <Route path='/login' element={
                    <Login/>
                }/>

                <Route path='/register' element={
                    <Register/>
                }/>

            </Routes>
        </BrowserRouter>
    )
};

export default RouterPage;
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/home/Home";
import Sidebar from "./components/misc/Sidebar";


function RouterPage() {
    return  (
        <BrowserRouter>
            <Sidebar/>
            <Routes>
                <Route exact path='/' element={
                    <Home/>
                }/>
            </Routes>
        </BrowserRouter>
    )
};

export default RouterPage;
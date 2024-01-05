import React, {useEffect, useRef, useState} from 'react';
import {Route, Routes, Outlet, NavLink} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieI, JsonDataMovie } from './type/movie.ts';
import Favourites from './pages/favourites.tsx';
import Home from './pages/home.tsx';
import Navbar from './component/navbar.tsx';
import LoginPage from './pages/login.tsx';

const App: React.FC = (): JSX.Element => {  
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="*" element={<h2>Nothing here...</h2>}/>

            </Routes>
        </>
    )
}

export default App

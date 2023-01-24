
import React from 'react'
import duck from './img/seduck.png';
import Ninjas from './components/Ninjas';
import Wanted from "./components/Wanted";
import {Navbar} from "./components/Navbar";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Techniques from "./components/Techniques";

function App() {
    return (
        <BrowserRouter>
        <body>
        <header className="MainHeader">
            <img className="Duck" src={duck}/>
            <h1>Этап 4</h1>
        </header>
        <div className="Sidebar">
            <Navbar/>
        </div>
        <div className="Pole">
            <Routes>
                <Route path={'/ninjas'} element={<Ninjas/>}/>
                <Route path={'/wanted'} element={<Wanted/>}/>
                <Route path={'/techniques'} element={<Techniques/>}/>
            </Routes>
        </div>
        </body>
        </BrowserRouter>
    )
        }
        export default App;

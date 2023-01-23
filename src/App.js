import React from 'react'
import Ninjas from './components/Ninjas';
import Wanted from "./components/Wanted";

function App() {
    return (
        <body>
        <header className="MainHeader">
            <h1>Этап 4</h1>
        </header>
        <div className="Sidebar">
            <a>jopa</a>
        </div>
        <div className="Pole">
            {/*<Ninjas/>*/}
            <Wanted/>
        </div>
        </body>
    )
        }
        export default App;

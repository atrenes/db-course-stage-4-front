import React from "react";
import {NavLink} from "react-router-dom";
export const Navbar = () => {
    return(
        <div>
            <ul>
                <li>
                    <NavLink to="/ninjas">Ninjas</NavLink>
                </li>
                <li>
                    <NavLink to="/wanted">Wanted</NavLink>
                </li>
            </ul>
        </div>
    )
}
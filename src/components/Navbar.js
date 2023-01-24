import React from "react";
import {NavLink} from "react-router-dom";
export const Navbar = () => {
    return(
        <div>
            <NavLink className="SideLink" to="/ninjas">Ninjas</NavLink>
            <NavLink className="SideLink" to="/wanted">Wanted</NavLink>
        </div>
    )
}
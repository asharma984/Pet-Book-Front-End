import React from 'react';
import {useHistory} from "react-router";

export default function AuthOptions(){
    const history=useHistory();

    const register=()=>history.push("./register");
    const login=()=>history.push("./login");
    //to do
    const search=()=>history.push("./AdvancedSearchComponent");

    return(
        <nav className="auth-options">
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={search}>Search</button>
        </nav>
    )
}

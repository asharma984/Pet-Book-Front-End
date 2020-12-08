import React,{useContext} from 'react';
import {useHistory} from "react-router";
import UserContext from "../../contex/UserContext";


export default function AuthOptions(){
    const history=useHistory();
    const {userData,setUserData}=useContext(UserContext);

    const register=()=>history.push("./register");
    const login=()=>history.push("./login");
    //to do
    const search=()=>history.push("./AdvancedSearchComponent");
    const logout=()=>{
        setUserData({
            token:undefined,
            user:undefined
        });
        localStorage.setItem("auth-token","");
    }

    return(
        <nav className="auth-options">
            {  userData.user?(  <>
                                 <button onClick={logout}>Logout</button>
                                 <button onClick={search}>Search</button>
                                 </>
                             ):
               ( <>
                <button onClick={register}>Register</button>
                < button onClick={login}>Login</button>
                <button onClick={search}>Search</button>
                </>
                )
            }
        </nav>
    )
}
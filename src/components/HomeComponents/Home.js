import React,{useContext,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../contex/UserContext";

export default function Home(){
    const history=useHistory();
    const {userData}=useContext(UserContext);
    useEffect(()=>{
       if(!userData.user) history.push("/login");
    });
    return(
        <div className>
            Home
        </div>
    )
}

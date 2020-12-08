import React,{useContext,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../contex/UserContext";
import ErrorComponent from "../../error/ErrorComponent";

export default function Home(){
    const history=useHistory();
    const {userData}=useContext(UserContext);
    useEffect(()=>{
       if(!userData.user) history.replace("/login");
    });
    const submit=async (e)=>{
        history.replace("/");
    }
    return(
        <div className="page">

            <form className="form" onSubmit={submit}>
                <input type="submit" value="Add Pets" />
                <input type="submit" value="Your Pets" />
                <input type="submit" value="Pets you follow" />

            </form>
        </div>
    )
}

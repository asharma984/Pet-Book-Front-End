import React,{useState,useEffect} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Axios from 'axios';
import Home from './Home';
import Header from './Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import '../../style.css';
import UserContext from "../../contex/UserContext";

function Application(){
    const [userData,setUserData] =useState(
        {
            token:undefined,
            user:undefined
        });

    useEffect(()=>{
      const checkLoggedIn=async ()=>{
       let token=localStorage.getItem("auth-token");
       if(token===null)
       {
           localStorage.setItem("auth-token","");
           token="";
       }
       const tokenRes=Axios.post("http://localhost:5000/users/tokenIsValid",null,
                                 {headers: { "x-auth-token":token } });
       if(tokenRes.data)
       {
           const userRes=Axios.get("http://localhost:5000/users/",
                                   {headers:{"x-auth-token":token} });

           setUserData({
                           token,
                           user:userRes
                       })

       }
      };
      checkLoggedIn();
    },[]);

    return(
        <>
            <BrowserRouter>
                <UserContext.Provider value={{userData,setUserData}}>
                <Header/>
                <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
                </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default Application;

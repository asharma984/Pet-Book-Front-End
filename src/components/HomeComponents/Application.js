import React,{useState,useEffect} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Axios from 'axios';
import Home from './Home';
import Header from './Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import '../../style.css';
import UserContext from "../../contex/UserContext";
import PetProfile from "../../containers/pet-profile.container";
import CreateBlogPost from "../create-blogpost.component";
import CreatePet from "../create-pet.component";
import AdvancedSearchComponent from "../AdvancedSearchComponent";
import PetGridComponent from "../PetGridComponent";
import PetContainer from "../PetContainer";
import Navbar from "../navbar.component";

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
                <div className="container-fluid">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile/:petId" exact component={PetProfile}/>
                    <Route path="/blog/:petId" exact component={CreateBlogPost}/>
                    <Route path="/pet/:userId" exact component={CreatePet}/>
                    <Route path="/AdvancedSearchComponent" exact component={AdvancedSearchComponent}/>
                    <Route path={["/AdvancedSearchComponent/search"]} exact component={PetGridComponent}/>
                    <Route path="/PetGridComponent/:animalType/:animalId" exact component={PetContainer}/>
                </Switch>
                </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default Application;

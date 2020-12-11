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
       const tokenRes=Axios.post("https://radiant-ravine-41044.herokuapp.com/users/tokenIsValid",null,
                                 {headers: { "x-auth-token":token } });
       if(tokenRes.data)
       {
           const userRes=Axios.get("https://radiant-ravine-41044.herokuapp.com/users/",
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
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile/:petId" exact component={PetProfile}/>
                    <Route exact path="/blog/:petId" exact component={CreateBlogPost}/>
                    <Route exact path="/pet/:userId" exact component={CreatePet}/>
                    <Route exact path="/AdvancedSearchComponent" exact component={AdvancedSearchComponent}/>
                    <Route exact path={["/AdvancedSearchComponent/search"]} exact component={PetGridComponent}/>
                    <Route exact path="/PetGridComponent/:animalType/:animalId" exact component={PetContainer}/>
                </Switch>
                </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default Application;

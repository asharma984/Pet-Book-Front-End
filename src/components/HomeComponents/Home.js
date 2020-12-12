import React,{useContext,useEffect} from 'react';
import {useHistory,Link} from "react-router-dom";
import UserContext from "../../contex/UserContext";

import Account from "../../containers/account.container"

import ErrorComponent from "../../error/ErrorComponent";

export default function Home(){
    const history=useHistory();
    const {userData}=useContext(UserContext);
    useEffect(()=>{
       if(!userData.user) history.replace("/login");
       if(userData.user) {
           console.log(userData.user.type);
           console.log(userData.user.id);
       }
    });

    const submit=async (e)=>{
        history.replace("/");
    }

    return(
        <div className="page">
<<<<<<< Updated upstream
            { userData.user && userData.user.type==="pet-owner" &&
            <form className="form" onSubmit={submit}>
                <input type="submit" value="Add Pets" />

                <input type="submit" value="Your Pets" />
                <input type="submit" value="Pets you follow" />

            </form> }

            { userData.user && userData.user.type==="pet-shelter" &&
              <form className="form" onSubmit={submit}>
                  <input type="submit" value="Add Pets" />

                  <input type="submit" value="Your Pets" />


              </form> }
=======
            {userData.user &&
             <Account userData={userData}/>
            }
>>>>>>> Stashed changes
        </div>
    )
}

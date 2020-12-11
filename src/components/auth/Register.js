import React,{useState,useContext} from 'react';
import Axios from 'axios';
import UserContext from "../../contex/UserContext";
import {useHistory,Link} from "react-router-dom";
import ErrorComponent from "../../error/ErrorComponent";

export default function Register(){
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [passwordCheck,setPasswordCheck]=useState();
    const [userName,setUserName]=useState();
    const [userType,setUserType]=useState("pet-owner");
    const {setUserData} =useContext(UserContext);
    const history=useHistory();
    const [error,setError]=useState();

    const submit= async (e)=>{
        e.preventDefault();
        try {
            const newUser = {email, password, passwordCheck, userName,userType};
            await Axios.post("http://localhost:5000/users/register", newUser);
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                {email, password}
            );
            setUserData({
                            token: loginRes.data.token,
                            user: loginRes.data.user
                        });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.replace("/");
        }
        catch(err){
         err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return(
        <div className="page">
            <h2>Create an account</h2>
            {error && <ErrorComponent message={error} clearError={()=>setError(undefined)} />
            }
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" placeholder="Verify password"
                       onChange={(e)=>setPasswordCheck(e.target.value)} />

                <label htmlFor="register-userName">UserName</label>
                <input id="register-userName" type="text" onChange={(e)=>setUserName(e.target.value)}/>

                <label>
                    Register as:
                    <select value={userType} onChange={(e)=>setUserType(e.target.value)}>
                        <option value="pet-owner">Pet-Owner</option>
                        <option value="pet-shelter">Pet-Shelter</option>
                    </select>
                </label>

                <input type="submit" value="Register" />

            </form>
        </div>
    )
}

import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Login from './auth/Login';
import Register from './auth/Register';
import '../style.css';


function Application(){
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Application;

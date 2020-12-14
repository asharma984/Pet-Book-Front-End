import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './Home';
import Header from './Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import '../../style.css';
import UserContext from '../../contex/UserContext';
import CreateBlogPost from '../CreateBlogPost';
import CreatePet from '../CreatePetComponent';
import AdvancedSearchComponent from '../AdvancedSearchComponent';
import PetGridComponent from '../PetGridComponent';
import PetContainer from '../PetContainer';
import PetProfileContainer from "../../containers/PetProfileContainer";
import {BASE_SERVER_URL} from "../../urls"

function Application() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = Axios.post(
        `${BASE_SERVER_URL}`,
        null,

        { headers: { 'x-auth-token': token } },
      );
      if (tokenRes.data) {
        const userRes = Axios.get(
            `${BASE_SERVER_URL}`,
          { headers: { 'x-auth-token': token } },
        );

        setUserData({
          token,
          user: userRes,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/user/:userId/profile/:petId"
                component={PetProfileContainer}
              />
              <Route exact path="/blog/:petId" component={CreateBlogPost} />
              <Route exact path="/pet/:userId" component={CreatePet} />
              <Route
                exact
                path="/AdvancedSearchComponent"
                component={AdvancedSearchComponent}
              />
              <Route
                exact
                path={['/AdvancedSearchComponent/search']}
                component={PetGridComponent}
              />
              <Route
                exact
                path="/PetGridComponent/:animalType/:animalId"
                component={PetContainer}
              />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default Application;

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contex/UserContext';

import Account from '../../containers/account.container';


export default function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const submit = async (e) => {
    history.replace('/');
  };

  return (
    <div className="page">
      {userData.user && <Account userData={userData} />}
      {!userData.user &&
      <div clasName="container">
        <h1>
          Welcome to Pet Book!
        </h1>
              <p>Pet-book is a place where you can search for cute pets, adoptable pets and aggregate your pet's social media presence.</p>
              <div>
                <p>
                  We hope you find everything you are looking for on here and more.
                  Most features do not require an account, however any related to interaction with pets do.
                </p>
                <p>The goal of this site is simple: Cute, interesting, and  unique pets bring people joy, and we want to spark joy.</p>
                <p>And maybe find some homes for pets too!</p>
              </div>
          </div>
      }
    </div>
  );
}

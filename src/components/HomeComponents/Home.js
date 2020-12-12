import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../contex/UserContext';

import Account from '../../containers/account.container';

import ErrorComponent from '../../error/ErrorComponent';

export default function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) history.replace('/login');
    if (userData.user) {
      console.log(userData.user.type);
      console.log(userData.user.id);
    }
  });

  const submit = async (e) => {
    history.replace('/');
  };

  return (
    <div className="page">
      {userData.user && <Account userData={userData} />}
    </div>
  );
}

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contex/UserContext';

import Account from '../../containers/account.container';


export default function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) history.replace('/login');
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

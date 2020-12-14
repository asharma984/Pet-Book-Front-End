import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../contex/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorComponent from '../../error/ErrorComponent';
import {BASE_SERVER_URL} from "../../urls";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loginRes = await Axios.post(
        `${BASE_SERVER_URL}/users/login`,
        loginUser,
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.replace('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h1>A Place for Pets!</h1>
      <h2>Login</h2>
      {error && (
        <ErrorComponent
          message={error}
          clearError={() => setError(undefined)}
        />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

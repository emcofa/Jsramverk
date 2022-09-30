import './App.css';
import React from 'react';

import { useState, useEffect } from 'react';

import UpdateDoc from './components/UpdateDoc'
import NewDoc from './components/NewDoc'
import Home from './components/Home'
import Footer from './components/Footer'

import authModel from './models/authModel';
import docsModel from './models/docsModel';
import {
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  const [docs, setDocs] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  async function fetchDocs() {
    const allDocs = await docsModel.getAllDocs(token)

    setDocs(allDocs);
  }

  useEffect(() => {
    (async () => {
      await fetchDocs();
    })();
  }, [token]);

  function changeHandler(event) {
    let newObject = {};

    newObject[event.target.name] = event.target.value;

    setUser({ ...user, ...newObject });
  }

  async function register() {
    await authModel.register(user);
  }

  async function login() {
    const loginResult = await authModel.login(user);

    console.log(loginResult.data.message);

    if (loginResult.data.token) {
      setToken(loginResult.data.token);
    } else {
      alert(loginResult.data.message)
    }
    setUser(loginResult);
    return loginResult
  }

  function logout() {
    window.location.reload(false);
  }

  return (
    <div>
      <div className="App">
        <h1 className="heading">Text Editor</h1>
      </div>
      {token ?
        <div className="trix-container">
          <button className='btn-register' onClick={() => logout()}>Logga ut</button>
          <Routes>
            <Route exact path="/" element={<Home data-testid="child" />} />
            <Route path="/docs/new" element={<NewDoc submitFunction={fetchDocs} user={user.data} token={token} />} />
            <Route path="/docs/update" element={<UpdateDoc submitFunction={fetchDocs} docs={docs} user={user.data} token={token} />} />
          </Routes>
        </div>
        :
        <div className="container">
          <h2>Login or register</h2>
          <p>Email</p>
          <input type="email" name="email" onChange={changeHandler} />
          <p>Password</p>
          <input type="password" name="password" onChange={changeHandler} />
          <p></p>
          <button className="btn-register btn-register" onClick={register}>Register</button>
          <button className="btn-margin btn-login" onClick={login}>Login</button>
        </div>
      }
      <Footer />
    </div>
  );
}
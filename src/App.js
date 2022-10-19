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

  async function register() {
    let register = await authModel.register(user);
    if (register.data) {
      alert(register.data.message);
    } else {
      alert(register.errors.message);
    }
  }

  async function login() {

    const loginResult = await authModel.login(user);

    if (loginResult.data.token) {
      setToken(loginResult.data.token);
    } else {
      alert(loginResult.data.message)
    }
    setUser(loginResult);
    return loginResult
  }

  async function fetchDocs() {
    console.log(token);
    const allDocs = await docsModel.getAllDocs(token)
    // const allDocs = await docsModel.graphQlAllDocs(token)

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

  return (
    <div>
      <div className="App">
        <h1 className="heading">Text Editor</h1>
      </div>
      {token ?
        <div className="trix-container">
          <Routes>
            <Route exact path="/" element={<Home data-testid="child" />} />
            <Route path="/docs/new" element={<NewDoc submitFunction={fetchDocs} user={user.data} token={token} />} />
            <Route path="/docs/update" element={<UpdateDoc submitFunction={fetchDocs} docs={docs} user={user.data} token={token} />} />
          </Routes>
        </div>
        :
        <div className="container2">
          <p>Email</p>
          <input className="login-input" type="email" name="email" onChange={changeHandler} />
          <p>Password</p>
          <input className="login-input" type="password" name="password" onChange={changeHandler} />
          <p></p>
          <div className="button-container">
            <button className="btn-save btn1 login-submit" onClick={register}>Register</button>
            <button className="btn-margin btn-access btn2 login-submit" onClick={login}>Login</button>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
}
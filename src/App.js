import './App.css';
import React from 'react';

import { useState, useEffect } from 'react';
import UpdateDoc from './components/UpdateDoc'
import NewDoc from './components/NewDoc'
import Home from './components/Home'
import Footer from './components/Footer'

import docsModel from './models/docsModel';
import {
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  const [docs, setDocs] = useState([]);

  async function fetchDocs() {
    const allDocs = await docsModel.getAllDocs();

    setDocs(allDocs);
  }

  useEffect(() => {
    (async () => {
      await fetchDocs();
    })();
  }, []);



  return (
    <div>
      <div className="App">
        <h1 className="heading">Text Editor</h1>
      </div>
      <div className="trix-container">
        <Routes>
          <Route exact path="/" element={<Home data-testid="child" />} />
          <Route path="docs/new" element={<NewDoc submitFunction={fetchDocs} />} />
          <Route path="docs/update" element={<UpdateDoc submitFunction={fetchDocs} docs={docs} />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
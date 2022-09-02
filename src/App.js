// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { TrixEditor } from "react-trix";
import "trix";
import "trix/dist/trix.css";


export default function App() {
  const [newHtml, setHTML] = useState("");
  const [newText, setText] = useState("");

  const handleChange = (html, text) => {
    setHTML(html);
    setText(text);
  };
  const handleSave = () => {
    console.log(newHtml);
    // console.log(newText);
  };

  return (
    <>
      <div className="App">
        <h1 className="heading">Text Editor</h1>
        <button type="button" className="trix-button trix-button--icon trix-button--icon-save" data-trix-attribute="save" title="Save" tabIndex="-1" onClick={handleSave}>Save</button>
      </div>
      <div className="trix-container">
        <TrixEditor
          className="trix-content"
          autoFocus={true}
          placeholder="Write something..."
          value=""
          onChange={handleChange}
        />
      </div>
    </>
  );
}
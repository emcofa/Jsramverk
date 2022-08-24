// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { TrixEditor } from "react-trix";
import "trix";


export default function App() {
  const [newHtml, setHTML] = useState("");
  const [newText, setText] = useState("");

  const handleChange = (html, text) => {
    setHTML(html);
    setText(text);
  };
  const handleSave = () => {
    console.log(newText);
  };
  let mergeTags = [
    {
      trigger: "@",
      tags: [
        { name: "Dominic St-Pierre", tag: "@dominic" },
        { name: "John Doe", tag: "@john" }
      ]
    },
    {
      trigger: "{",
      tags: [
        { name: "First name", tag: "{{ .FirstName }}" },
        { name: "Last name", tag: "{{ .LastName }}" }
      ]
    }
  ];


  return (
    <>
      <div className="App">
        <h1>Text editor</h1>
        <button type="button" className="trix-button trix-button--icon trix-button--icon-save" data-trix-attribute="save" title="Save" tabIndex="-1" onClick={handleSave}>Save</button>
      </div>
      <TrixEditor
        className="custom-css-class"
        autoFocus={true}
        placeholder="Write something..."
        value=""
        uploadURL="https://domain.com/imgupload/receiving/post"
        uploadData={{ "key1": "value", "key2": "value" }}
        fileParamName="blob"
        mergeTags={mergeTags}
        onChange={handleChange}
      />
    </>
  );
}

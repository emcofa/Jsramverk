import React, { useState } from 'react';
import docsModel from '../models/docsModel';
import { TrixEditor } from "react-trix";
import "trix";
import "trix/dist/trix.css";
import { Link } from "react-router-dom";


export default function NewDoc({ submitFunction }) {
    const [newDoc, setNewDoc] = useState({});


    function setEditorContent(content) {
        let element = document.querySelector("trix-editor");

        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        element.editor.insertHTML(content);
    }


    function handleChangeName(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;
        console.log(event.target.value);
        setNewDoc({ ...newDoc, ...newObject });
    }

    async function saveDocs() {
        let element = document.querySelector("trix-editor");

        setEditorContent(element.value);
        let insertNewDoc = {
            name: newDoc.name,
            html: element.value
        }

        await docsModel.saveDocs(insertNewDoc);

        submitFunction();
        alert("Document saved as new file, go to 'edit existing document' to edit it.")
    }


    return (
        <div className="container">
            <div className="wrapper-container">
                <Link className="link" to="/">Back to front page</Link>
            </div>
            <button className="btn" disabled={Object.keys(newDoc).length < 1 || newDoc.name === ""} onClick={saveDocs}>Save as new document</button>
            <div className="wrapper-container">
                <h3>Document name:</h3>
                <input className="title" onChange={handleChangeName} name="name" />
            </div>
            <TrixEditor
                className="trix-content"
                autoFocus={true}
                placeholder="Write something..."
            />
        </div>
    );
}
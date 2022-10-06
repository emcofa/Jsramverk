import React, { useState } from 'react';
import docsModel from '../models/docsModel';
import { TrixEditor } from "react-trix";
import "trix/dist/trix.css";
import { Link } from "react-router-dom";
import './button.css';


export default function NewDoc({ submitFunction, user, token }) {
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
        // console.log(event.target.value);
        setNewDoc({ ...newDoc, ...newObject });
    }

    async function saveDocs() {
        let element = document.querySelector("trix-editor");

        setEditorContent(element.value);
        let insertNewDoc = {
            name: newDoc.name,
            html: element.value,
            owner: user.email,
            allowed_user: [user.email]
        }

        // console.log(insertNewDoc)

        await docsModel.graphQlSaveDocs(insertNewDoc, token);

        submitFunction();
        alert("Document saved as new file, go to 'edit existing document' to edit it.")
    }


    return (
        <div className="container">
            <div className="wrapper-container">
                <Link className="link" to="/">Back to front page</Link>
            </div>
            <div className="wrapper-container">
                <button className="btn-save btn1" hidden={Object.keys(newDoc).length < 1 || newDoc.name === ""} onClick={saveDocs}>Save as new document</button>
            </div>
            <div className="wrapper-container">
                <input className="title" onChange={handleChangeName} placeholder="Insert document name" name="name" />
            </div>
            <TrixEditor
                className="trix-content"
                autoFocus={true}
                placeholder="Write something..."
            />
        </div>
    );
}
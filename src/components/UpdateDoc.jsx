import React, { useState, useEffect } from 'react';
import docsModel from '../models/docsModel';

import { io } from "socket.io-client";

import { TrixEditor } from "react-trix";
import "trix/dist/trix.css";
import { Link } from "react-router-dom";
import './button.css';
import './style.css';
import './link.css';

let updateCurrentDocOnChange = false;
let sendToSocket = false;

function changeSendToSocket(value) {
    sendToSocket = value;
}

export default function UpdateDoc({ submitFunction, docs }) {
    let [html, setHtml] = useState('');
    const [getCurrentDoc, setCurrentDoc] = useState([]);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        if (socket && sendToSocket) {
            socket.on("doc", (data) => {
                setEditorContent(data.html, false);
            });

            let data = {
                _id: getCurrentDoc._id,
                name: getCurrentDoc.name,
                html: html
            };

            socket.emit("docsData", data);
        }

        changeSendToSocket(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentDoc]);

    useEffect(() => {
        setSocket(io("http://localhost:8888"));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (socket) {
            socket.on("docsData", function (data) {
                changeSendToSocket(false);
                setCurrentDoc(data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    function handleChange(event) {
        setHtml(event);
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, getCurrentDoc);

            copy.html = html;

            setCurrentDoc(copy);
        }

        updateCurrentDocOnChange = true;
    }

    function setEditorContent(content, triggerChange) {
        let element = document.querySelector("trix-editor");

        updateCurrentDocOnChange = triggerChange;
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        updateCurrentDocOnChange = triggerChange;
        element.editor.insertHTML(content);
    }

    async function fetchDoc() {

        let selectElement = document.querySelector('#select');
        let output = selectElement.options[selectElement.selectedIndex].value;
        let singleDocId = docs[output]._id;

        const singleDocs = await docsModel.getSingleDocs(singleDocId);

        setEditorContent(singleDocs.html, true);
        setCurrentDoc(singleDocs);
    };

    async function updateDocs() {
        let idDoc = getCurrentDoc._id
        let nameDoc = getCurrentDoc.name
        let htmlDoc = html
        let nameAndText = {
            name: nameDoc,
            html: htmlDoc
        }
        await docsModel.update(nameAndText, idDoc);

        submitFunction();
        alert(`Document ${nameDoc} successfully saved!`)
    }

    function handleChangeName(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;
        setCurrentDoc({ ...getCurrentDoc, ...newObject });
    }

    function button() {
        let btn = document.querySelector("button")
        btn.removeAttribute("hidden");
        document.querySelector(".title").disabled = false
    }

    function twoCalls() {
        fetchDoc()
        button()
    };

    return (
        <div className="container">
            <div className="wrapper-container">
                <Link className="link" to="/">Back to front page</Link>
            </div>
            <div className="wrapper-container">
                <select id="select"
                    onChange={twoCalls} value="value"
                >
                    <option className="option" value="-99" key="0">{getCurrentDoc.name || "Select document"}</option>
                    {docs.map((doc, index) => <option id={doc._id} value={index} key={index}>{doc.name}</option>)}
                </select>
                <button className="btn btn-margin" data-testid="hidden" onClick={updateDocs} hidden>Save updates</button>
            </div>
            <div className="wrapper-container">
                <h3>Document name:</h3>
                <input className="title" data-testid="title" onChange={handleChangeName} disabled={true} name="name" value={getCurrentDoc.name || ""} />
            </div>
            <TrixEditor
                className="trix-content"
                autoFocus={true}
                name="html"
                onChange={handleChange}
            />
        </div >
    );
}
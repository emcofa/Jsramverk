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

export default function UpdateDoc({ submitFunction, docs, user }) {
    const [html, setHtml] = useState('');
    const [getCurrentDoc, setCurrentDoc] = useState([]);
    const [access, setAccess] = useState([]);
    const [socket, setSocket] = useState(null);
    const filterAccess = [];

    const filtered = docs.filter(doc => doc.owner === user.email);

    useEffect(() => {
        if (socket && sendToSocket) {

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
        // setSocket(io("https://jsramverk-editor-emfh21.azurewebsites.net"));
        setSocket(io("https://localhost:8888"));

        if (socket) {
            socket.emit("create", getCurrentDoc["_id"]);

            socket.on("docsData", (data) => {
                setEditorContent(data.html, false);
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentDoc]);

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
        if (updateCurrentDocOnChange) {
            setHtml(event);
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
        // console.log("selectElement", selectElement);
        let output = selectElement.options[selectElement.selectedIndex].value;
        // console.log("output", output);
        let singleDocId = filterAccess[output]._id;

        const singleDocs = await docsModel.getSingleDocs(singleDocId);

        console.log("singledocs", singleDocs);
        console.log("singledocs html", singleDocs.html);
        setEditorContent(singleDocs.html, true);
        setCurrentDoc(singleDocs);
    };
    async function giveAccess() {
        let idDoc = getCurrentDoc._id
        let nameDoc = getCurrentDoc.name
        let htmlDoc = html
        let values = {
            name: nameDoc,
            html: htmlDoc,
            owner: user.email,
            allowed_user: access.access
        }

        console.log(values);
        // console.log("idDoc access", idDoc)
        await docsModel.giveAccess(values, idDoc);

        submitFunction();
        alert(`New changes saved`)
    }

    function handleChangeName(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;
        setCurrentDoc({ ...getCurrentDoc, ...newObject });
    }

    function handleAccess(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;
        setAccess({ ...access, ...newObject });
    }

    function showAccess() {
        let input = document.querySelector(".access")
        input.removeAttribute("hidden");
        // document.querySelector(".title").disabled = false
    }


    function button() {
        let btn = document.querySelector("button")
        btn.removeAttribute("hidden");
        document.querySelector(".title").disabled = false
    }

    function button2() {
        let btn = document.querySelector(".button2")
        btn.removeAttribute("hidden");
        document.querySelector(".title").disabled = false
    }

    function twoCalls() {
        fetchDoc()
        button()
        showAccess()
        button2()
    };

    // console.log(user.email)

    docs.map(function (element) {
        for (const key in element) {
            if (key === "allowed_users") {
                if (element.allowed_users.includes(user.email)) {
                    filterAccess.push(element)
                }
            }
        }
    })

    // console.log(filterAccess);

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
                    {filterAccess.map((doc, index) => <option id={doc._id} value={index} key={index}>{doc.name}</option>)}
                </select>
            </div>
            <div className="wrapper-container">
                <h3>Document name:</h3>
                <input className="title" data-testid="title" onChange={handleChangeName} disabled={true} name="name" value={getCurrentDoc.name || ""} />
                <button className="btn btn-margin" data-testid="hidden" onClick={giveAccess}>Save name</button>
            </div>
            <div className="wrapper-container">
                <input className="access margin" onChange={handleAccess} placeholder="User email" name="access" hidden />
                <button className="button2 btn btn-margin" onClick={giveAccess} hidden>Give user access</button>
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
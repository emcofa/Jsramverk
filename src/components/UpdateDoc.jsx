import React, { useState, useEffect } from 'react';
import docsModel from '../models/docsModel';

import { io } from "socket.io-client";

import { TrixEditor } from "react-trix";
import "trix/dist/trix.css";
import { Link } from "react-router-dom";
import Pdf from './Pdf'
import Contact from './Contact'

import './button.css';
import './style.css';
import './link.css';
import './select.css';
import './email.css';

let updateCurrentDocOnChange = false;
let sendToSocket = false;

function changeSendToSocket(value) {
    sendToSocket = value;
}

export default function UpdateDoc({ submitFunction, docs, user, token }) {
    const [html, setHtml] = useState('');
    const [text, setText] = useState("");
    const [getCurrentDoc, setCurrentDoc] = useState([]);
    const [access, setAccess] = useState([]);
    const [socket, setSocket] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);
    const filterAccess = [];

    useEffect(() => {
        if (socket && sendToSocket) {

            let data = {
                _id: getCurrentDoc._id,
                name: getCurrentDoc.name,
                html: html,
                owner: user.email,
                allowed_user: access.access
            };
            socket.emit("docsData", data);
        }

        changeSendToSocket(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentDoc]);


    useEffect(() => {
        // setSocket(io("http://localhost:8888"));
        setSocket(io("https://jsramverk-editor-emfh21.azurewebsites.net"));

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

    function handleChange(event, newText) {
        if (updateCurrentDocOnChange) {
            setHtml(event);
            setText(newText);
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

    async function fetchDoc(newText) {
        let selectElement = document.querySelector('#select');
        let output = selectElement.options[selectElement.selectedIndex].value;
        let singleDocId = filterAccess[output]._id;

        const singleDocs = await docsModel.getSingleDocs(singleDocId, token);

        setEditorContent(singleDocs.html, true);
        setCurrentDoc(singleDocs);
    };
    async function giveAccess() {
        let idDoc = getCurrentDoc._id
        let values = {
            allowed_user: access.access
        }

        await docsModel.graphQlGiveAccess(values, idDoc, token);

        submitFunction();
    }

    async function updateName() {
        let idDoc = getCurrentDoc._id
        let nameDoc = getCurrentDoc.name
        let values = {
            name: nameDoc
        }
        await docsModel.graphQlUpdateName(values, idDoc, token);

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
        let inputTitle = document.querySelector(".title")
        input.removeAttribute("hidden");
        inputTitle.removeAttribute("hidden");
    }


    function button() {
        let btn = document.querySelector(".btn-save")
        btn.removeAttribute("hidden");
        document.querySelector(".title").disabled = false
    }

    function button2() {
        let btn = document.querySelector(".btn-access")
        btn.removeAttribute("hidden");
        document.querySelector(".title").disabled = false
    }

    function multipleCalls(newText) {
        fetchDoc(newText)
        button()
        showAccess()
        button2()
    };

    docs.map(function (element) {
        for (const key in element) {
            if (key === "allowed_users") {
                if (element.allowed_users.includes(user.email)) {
                    filterAccess.push(element)
                }
            }
        }
        return filterAccess;
    })

    function accessSet() {
        giveAccess();
        setButtonPopup(true);
        alert(`Access set to user ${access.access}`)
    };


    return (
        <div className="container">
            <div className="back-link">
                <Link className="link" to="/">Back to front page</Link>
            </div>
            <div className="wrapper-container">
                <select className="custom-select" id="select"
                    onChange={multipleCalls} value="value"
                >
                    <option className="option" value="-99" key="0">{"Select document" || "Current doc - " + getCurrentDoc.name}</option>
                    {filterAccess.map((doc, index) => <option id={doc._id} value={index} key={index}>{doc.name}</option>)}
                </select>
            </div>
            <div className="wrapper-container">
                <input className="access margin" onChange={handleAccess} placeholder="User email" name="access" hidden />
                <button className="btn-access btn2 btn-margin" data-testid="hidden-give-access" onClick={accessSet} hidden>Give access</button>
            </div>
            <div className="wrapper-container2">
                <input className="title" data-testid="title" onChange={handleChangeName} disabled={true} hidden name="name" value={getCurrentDoc.name || ""} />
                <button className="btn-save btn1 btn-margin" data-testid="hidden-update-name" onClick={updateName} placeholder="Document name" hidden>Update name</button>
            </div>
            {text ?
                <div className="pdf-container">
                    {/* <span className="email" onClick={() => setButtonPopup(true)}>Email an invitation?</span> */}
                    <Contact user={user} getCurrentDoc={getCurrentDoc} access={access.access} setTrigger={setButtonPopup} trigger={buttonPopup} />
                    <Pdf getCurrentDoc={getCurrentDoc} text={text} />
                </div>
                :
                <p></p>
            }
            <TrixEditor
                className="trix-content"
                autoFocus={true}
                name="html"
                onChange={handleChange}
            />
        </div>
    );
}
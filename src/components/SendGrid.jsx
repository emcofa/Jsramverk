import { React, useState } from "react";
import docsModel from '../models/docsModel';
import './button.css'
import './popup.css'

const Message = (props) => {
    const [name, setName] = useState('');

    async function submit() {
        let usersName = name
        let email = props.user.email
        let access = props.access
        let doc = props.getCurrentDoc.name
        let text = "http://www.student.bth.se/~emfh21/editor/"
        let data = await docsModel.postData(usersName, email, access, doc, text);

        if (data === "success") {
            alert(`Email sent to ${access}.`);
        } else {
            alert("Could not send email.");
        }
        props.setTrigger(false)
    }

    return (props.trigger) ? (
        <section>
            <div className="container popup">
                <div className="popup-inner">
                    <p>
                        <strong>
                            Would you also like to email an invitation?
                        </strong>
                    </p>
                    <input className="login-input" type="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input className="login-input" type="email" defaultValue={props.access} required />
                    <div>
                        <button className="btn margin-top-btn" onClick={submit}>Send</button>
                    </div>
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                </div>
                {props.children}
            </div>
        </section >
    ) : "";
};

export default Message;
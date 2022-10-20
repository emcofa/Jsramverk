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
        console.log(usersName, email, access, doc, text);
        await docsModel.postData(usersName, email, access, doc, text);
        alert(`Email sent to ${access}.`);
        props.setTrigger(false)
    }

    return (props.trigger) ? (
        <section>
            <div className="container popup">
                <div className="popup-inner">
                    <p>
                        <strong>
                            Would you also like to send an email invitation?
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
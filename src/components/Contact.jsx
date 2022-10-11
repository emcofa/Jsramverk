import { React, useRef } from "react";
import './button.css'
import './popup.css'
import emailjs from '@emailjs/browser';

const Contact = (props) => {
    // console.log(props)
    const form = useRef();

    const sendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_8ymzhfn', 'template_gau4hld', form.current, 'XlpCETnmdqjIlO6B_')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        event.target.reset();
    };

    return (props.trigger) ? (
        <section>
            <div className="container popup">
                <div className="popup-inner">
                    <p>
                        <strong>
                            Would you also like to email your invitation?
                        </strong>
                    </p>
                    <form ref={form} onSubmit={sendEmail}>
                        <input className="login-input" type="name" placeholder="Name" name="user_name" required />
                        <input className="login-input" type="email" defaultValue={props.access} name="user_email" required />
                        <input className="login-input" type="name" defaultValue={props.user.email} name="from_user" required hidden />
                        <input className="login-input" type="name" defaultValue={props.getCurrentDoc.name} name="doc_name" required hidden />
                        <textarea className="login-input" type="text" defaultValue="http://www.student.bth.se/~emfh21/editor/"  name="message" required hidden />
                        <div>
                            <button className="btn margin-top-btn" type="submit">Send</button>
                        </div>
                        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                    </form>
                    {props.children}
                </div>
            </div>
        </section>
    ) : "";
};

export default Contact;

import React from 'react';
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import './icon.css';


export default function Pdf(props) {
    function getText() {
        let html = document.querySelector(".trix-content")
        return html.innerText
    }

    function saveToPdf() {
        const doc = new jsPDF();
        let text = getText();
        doc.text(text, 10, 10);
        doc.save(`${props.getCurrentDoc.name}.pdf`);
    }

    return (
        <div className='to-pdf'>
            <FontAwesomeIcon className="icon" title="Create pdf file" icon={faFilePdf} onClick={saveToPdf} />
        </div>
    );
}
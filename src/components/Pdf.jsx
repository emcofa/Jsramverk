import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import './icon.css';


export default function Pdf(props) {

    // .trix-cintent
    function getText() {
        let html = document.querySelector(".trix-content")
        return html.innerText
    }

    function saveToPdf() {
        const input = document.querySelector(".trix-content");
        html2canvas(input)
            .then((canvas) => {
                let imgWidth = 210;
                let imgHeight = 300;
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${props.getCurrentDoc.name}.pdf`);
            })
            ;
        // const doc = new jsPDF();
        // let text = getText();
        // console.log(text);
        // doc.text(text, 10, 10);
        // doc.save(`${props.getCurrentDoc.name}.pdf`);
    }

    return (
        <div className='to-pdf'>
            <FontAwesomeIcon className="icon" title="Create pdf file" icon={faFilePdf} onClick={saveToPdf} />
        </div>
    );
}
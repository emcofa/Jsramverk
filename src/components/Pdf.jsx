import React from 'react'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import './icon.css';


export default function Pdf(props) {
    function saveToPdf() {
        const input = document.querySelector(".trix-content");
        html2canvas(input)
            .then((canvas) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                var imgWidth = pdf.internal.pageSize.getWidth();
                var imgHeight = pdf.internal.pageSize.getHeight();
                const imgData = canvas.toDataURL('img/png');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(`${props.getCurrentDoc.name}.pdf`);
            })
            ;
    }

    return (
        <div className='to-pdf'>
            <FontAwesomeIcon className="icon" title="Create pdf file" icon={faPrint} onClick={saveToPdf} />
        </div>
    );
}
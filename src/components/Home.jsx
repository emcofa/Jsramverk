import React from "react";
// importing Link from react-router-dom to navigate to 
import './button.css'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <h2>Welcome to Text Editor!</h2>
            <h3> Start writing by choosing one of the options below:</h3>
            <br />
            <ul>
                <li>
                    <div className="button-container">
                        <Link className="button" to="docs/new"> New document</Link>
                    </div>
                </li>
                <li>
                    <div className="button-container">
                        <Link className="button" to="docs/update">Edit document </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Home;

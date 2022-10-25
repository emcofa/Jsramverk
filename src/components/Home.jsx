import React from "react";
// importing Link from react-router-dom to navigate to 
import './button.css'
import { Link } from "react-router-dom";
import Logout from './Logout'


const Home = (data) => {
    return (
        <div className="container">
            <Logout />
            <h1>Welcome {data.user.email}!</h1>
            <h3> Start writing by choosing one of the options below</h3>
            <br />
            <ul>
                <li>
                    <div>
                        <Link className="btn btn-front" to="/docs/new"> New document</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <Link className="btn btn-front" to="/docs/update">Edit document </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Home;

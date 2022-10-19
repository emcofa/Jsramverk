import React from "react";
import './button.css'


const Logout = () => {
    function logout() {
        window.location.reload(false);
    }
    return (
        <p className="signout" onClick={() => logout()}> <i className="arrow left"></i> Sign out</p>
    );
};

export default Logout;
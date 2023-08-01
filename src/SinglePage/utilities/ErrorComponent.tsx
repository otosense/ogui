import React from 'react';
import { Routes, Route, BrowserRouter, useNavigate, useLocation } from 'react-router-dom';

export default function ErrorComponent() {
    var getLocation = window.location.href.split('/');
    const location = useLocation();
    const navigate = useNavigate();

    const refreshPage = () => {
        history.go(0);
    };

    return (
        <div className='common-Error-Msg'>
            <h1 className="error-title">
                Woops! <br />Something went wrong :(
            </h1>
            <hr />
            <button onClick={refreshPage} className='ReturnBtn'>Return to {getLocation[getLocation.length - 1]}</button>
        </div>
    );
}



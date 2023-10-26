import React from 'react';
import './notfound.css';

const NotFound = () => {
    return (
        <div className="errorContainer">
            <h1 className="errorTitle">Error 404:</h1>
            <h3 className="errorMessage">Página inexistente</h3>
        </div>
    );
}

export default NotFound;
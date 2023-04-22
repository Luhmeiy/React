import React, { useContext } from 'react';
import App, { AppContext } from '../App';

const Context = () => {
    const details = useContext(AppContext);

    return (
        <>
            {details && (
                <div>
                    <h1>Details</h1>
                    <p>Language: {details.language}</p>
                    <p>Framework: {details.framework}</p>
                    <p>Quantity of projects: {details.projects}</p>
                </div>
            )}
        </>
    )
}

export default Context;
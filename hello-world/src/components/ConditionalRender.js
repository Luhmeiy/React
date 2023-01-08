import { useState } from 'react';

const ConditionalRender = () => {
    const [x] = useState(true);

    const [name, setName] = useState("Matheus");

    return (
        <div>
            <h1>Will this be displayed?</h1>
            { x && <p>If x = true, yes!</p> }
            { !x && <p>If x = false, yes!</p> }

            {name === "João" ? (
                <div>
                    <p>Name is João.</p>
                </div>
            ) : (
                <div>
                    <p>Name not found!</p>
                </div>
            )}

            <button onClick={() => setName("João")}>Change name</button>
        </div>
    )
}

export default ConditionalRender;
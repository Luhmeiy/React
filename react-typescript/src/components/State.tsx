import React, { useState, ChangeEvent } from 'react'

const Statet = () => {
    const [text, setText] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    return (
        <div>
            <p>Text is {text}</p>
            <input type="text" name="" onChange={handleChange} />
        </div>
    )
}

export default Statet;
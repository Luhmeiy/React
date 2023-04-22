// context
import { CounterContext } from "../context/CounterContext";

// React
import { useContext } from "react";

const ChangeCounter = () => {
    const { counter, setCounter } = useContext(CounterContext);

    return (
        <>
            <button onClick={() => setCounter(counter + 1)}>Add value to counter</button>
        </>
    )
}

export default ChangeCounter;
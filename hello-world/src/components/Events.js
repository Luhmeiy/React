const Events = () => {
    const handleMyEvent = (e) => {
        console.log("Event activated.");
    }

    const renderSomething = (x) => {
        if (x) {
            return <h1>Render this!</h1>
        } else {
            return <h1>Also render this!</h1>
        }
    }

    return (
        <div>
            <div>
                <button onClick={handleMyEvent}>Click here too!</button>
            </div>

            <div>
                <button onClick={() => console.log("Clicked!")}>Click here!</button>
            </div>
            {renderSomething(true)}
            {renderSomething(false)}
        </div>
    )
}

export default Events;
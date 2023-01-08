const Container = ({ children, myValue }) => {
    return (
        <div>
            <h2>This is the title of the container</h2>
            {children}
            <p>Value: {myValue}</p>
        </div>
    )
}

export default Container;
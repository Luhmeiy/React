const Challenge = () => {
    const num1 = 5;
    const num2 = 5;

    return (
        <div>
            <p>The first number is {num1}</p>
            <p>The second number is {num2}</p>
            <button onClick={() => console.log(num1 + num2)}>Add</button>
        </div>
    )
}

export default Challenge;
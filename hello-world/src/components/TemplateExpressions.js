const TemplateExpressions = () => {
    const name = "Matheus";
    const data = {
        age: 31,
        job: "Programmer"
    }

    return (
        <div>
            <h1>Hello {name}, how are you?</h1>
            <p>You are a {data.job}.</p>
        </div>
    )
}

export default TemplateExpressions;
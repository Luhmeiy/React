type Props = {
    name: string
}

const SecondComponent = (props: Props) => {
    return (
        <div>
            <h1>My second component</h1>
            <p>His name is {props.name}</p>
        </div>
    )
}

export default SecondComponent;
const UserDetails = ({ name, age, job }) => {
    return (
        <div>
            <ul>
                <li>Name: {name}</li>
                <li>Age: {age}</li>
                <li>Job: {job}</li>
                <li>{ age >= 18 ? "Able to get a driver's license" : "Unable to get a driver's license" }</li>
            </ul>
        </div>
    )
}

export default UserDetails;
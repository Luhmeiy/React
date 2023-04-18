import { useSelector } from "react-redux";
import Message from "../Message";
import { initialStateData } from "../../interfaces/initialStateData";

const SubmitButton = ({
	action,
	message,
}: {
	action: string;
	message?: string;
}) => {
	const { loading, error } = useSelector(
		(state: initialStateData) => state.auth
	);

	return (
		<>
			{loading && <input type="submit" value="Aguarde..." disabled />}
			{!loading && <input type="submit" value={action} />}
			{error && <Message msg={error} type="error" />}
			{message && <Message msg={message} type="success" />}
		</>
	);
};

export default SubmitButton;

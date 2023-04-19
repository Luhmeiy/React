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
	const { message: messagePhoto, error: errorPhoto } = useSelector(
		(state: initialStateData) => state.photo!
	);

	return (
		<>
			{loading && <input type="submit" value="Aguarde..." disabled />}
			{!loading && <input type="submit" value={action} />}
			{error && <Message msg={error} type="error" />}
			{message && <Message msg={message} type="success" />}
			{errorPhoto && <Message msg={errorPhoto} type="error" />}
			{messagePhoto && <Message msg={messagePhoto} type="success" />}
		</>
	);
};

export default SubmitButton;

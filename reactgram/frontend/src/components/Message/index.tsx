import styles from "./Message.module.scss";

interface IMessage {
	msg: string;
	type: "error" | "success";
}

const Message = ({ msg, type }: IMessage) => {
	return (
		<div className={`${styles.message} ${styles[type]}`}>
			<p>{msg}</p>
		</div>
	);
};

export default Message;

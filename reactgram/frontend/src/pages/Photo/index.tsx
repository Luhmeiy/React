import styles from "./Photo.module.scss";

import { uploads } from "../../utils/config";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

// Components
import { LikeContainer, Message, PhotoItem } from "../../components";

// Hooks
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";

const Photo = () => {
	const { id } = useParams();

	const dispatch: AppDispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state: initialStateData) => state.auth);
	const { photo, loading, error, message } = useSelector(
		(state: initialStateData) => state.photo!
	);

	const [commentText, setCommentText] = useState("");

	// Load photo data
	useEffect(() => {
		dispatch(getPhoto(id!));
	}, [dispatch, id]);

	// Insert a like
	const handleLike = () => {
		dispatch(like(photo._id));

		resetMessage();
	};

	// Insert a comment
	const handleComment = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const commentData = {
			comment: commentText,
			id: photo._id,
		};

		dispatch(comment(commentData));

		setCommentText("");

		resetMessage();
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.photo}>
			<PhotoItem photo={photo} />
			<LikeContainer photo={photo} user={user} handleLike={handleLike} />

			<div className={styles["message-container"]}>
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />}
			</div>

			<div className="comments">
				{photo.comments && (
					<>
						<h3>Comentários: ({photo.comments.length})</h3>

						<form onSubmit={handleComment}>
							<input
								type="text"
								placeholder="Insira o seu comentário..."
								onChange={(e) => setCommentText(e.target.value)}
								value={commentText}
							/>

							<input type="submit" value="Enviar" />
						</form>

						{photo.comments.length === 0 && (
							<p>Não há comentários...</p>
						)}
						{photo.comments.map((comment: any) => (
							<div
								className={styles.comments}
								key={comment.comment}
							>
								<div className={styles.author}>
									{comment.userImage && (
										<img
											src={`${uploads}/users/${comment.userImage}`}
											alt={comment.userName}
										/>
									)}
									<Link to={`/users/${comment.userId}`}>
										<p>{comment.userName}</p>
									</Link>
								</div>

								<p>{comment.comment}</p>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Photo;

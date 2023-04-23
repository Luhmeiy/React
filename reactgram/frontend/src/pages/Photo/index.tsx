import styles from "./Photo.module.scss";

import { uploads } from "../../utils/config";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

// Components
import { LikeContainer, Message, PhotoItem } from "../../components";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like } from "../../slices/photoSlice";

const Photo = () => {
	const { id } = useParams();

	const dispatch: AppDispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state: initialStateData) => state.auth);
	const { photo, loading, error, message } = useSelector(
		(state: initialStateData) => state.photo!
	);

	// Comments

	// Load photo data
	useEffect(() => {
		dispatch(getPhoto(id!));
	}, [dispatch, id]);

	const handleLike = () => {
		dispatch(like(photo._id));

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
		</div>
	);
};

export default Photo;

import styles from "./Photo.module.scss";

import { uploads } from "../../utils/config";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

// Components
import { PhotoItem } from "../../components";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
	const { id } = useParams();

	const dispatch: AppDispatch = useDispatch();

	const { user } = useSelector((state: initialStateData) => state.auth);
	const { photo, loading, error, message } = useSelector(
		(state: initialStateData) => state.photo!
	);

	// Comments

	// Load photo data
	useEffect(() => {
		dispatch(getPhoto(id!));
	}, [dispatch, id]);

	// Like and comment

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.photo}>
			<PhotoItem photo={photo} />
		</div>
	);
};

export default Photo;

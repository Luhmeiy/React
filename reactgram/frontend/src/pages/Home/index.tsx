import styles from "./Home.module.scss";
import { AppDispatch } from "../../types/AppDispatch";
import { initialStateData, photoData } from "../../interfaces/initialStateData";

// Components
import { LikeContainer, PhotoItem } from "../../components";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
	const dispatch: AppDispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state: initialStateData) => state.auth);
	const { photos, loading } = useSelector(
		(state: initialStateData) => state.photo!
	);

	// Load all photos
	useEffect(() => {
		dispatch(getPhotos());
	}, [dispatch]);

	// Like a photo
	const handleLike = (photo: photoData) => {
		dispatch(like(photo._id!));

		resetMessage();
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.home}>
			{photos &&
				photos.map((photo: photoData) => (
					<div key={photo._id}>
						<PhotoItem photo={photo} />
						<LikeContainer
							photo={photo}
							user={user}
							handleLike={handleLike}
						/>
						<Link
							to={`/photos/${photo._id}`}
							className={styles.btn}
						>
							Ver mais
						</Link>
					</div>
				))}
			{photos && photos.length === 0 && (
				<h2 className={styles["no-photos"]}>
					Ainda não há fotos publicadas,{" "}
					<Link to={`/users/${user._id}`}>clique aqui</Link>
				</h2>
			)}
		</div>
	);
};

export default Home;

import styles from "./Search.module.scss";
import { AppDispatch } from "../../types/AppDispatch";
import { initialStateData, photoData } from "../../interfaces/initialStateData";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// Components
import { LikeContainer, PhotoItem } from "../../components";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
	const query = useQuery();
	const search = query.get("q");

	const dispatch: AppDispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state: initialStateData) => state.auth);
	const { photos, loading } = useSelector(
		(state: initialStateData) => state.photo!
	);

	// Load photos
	useEffect(() => {
		dispatch(searchPhotos(search!));
	}, [dispatch, search]);

	// Like a photo
	const handleLike = (photo: photoData) => {
		dispatch(like(photo._id!));

		resetMessage();
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.search}>
			<h2>Você está buscando por: {search}</h2>
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
				<h2>Não foram encontrados resultados para sua busca...</h2>
			)}
		</div>
	);
};

export default Search;

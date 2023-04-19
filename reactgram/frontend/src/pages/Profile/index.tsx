import styles from "./Profile.module.scss";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

import { uploads } from "../../utils/config";

// Components
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { SubmitButton } from "../../components";

// Hooks
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
	getUserPhotos,
	publishPhoto,
	resetMessage,
} from "../../slices/photoSlice";

interface IPhotoData {
	_id?: string;
	title: string;
	image: File | undefined;
}

const Profile = () => {
	const { id } = useParams();

	const dispatch: AppDispatch = useDispatch();

	const { user, loading } = useSelector(
		(state: initialStateData) => state.user
	);
	const { user: userAuth } = useSelector(
		(state: initialStateData) => state.auth
	);
	const { photos } = useSelector((state: initialStateData) => state.photo!);

	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File>();

	// New form and edit form refs
	const newPhotoForm = useRef(null);
	const editPhotoForm = useRef(null);

	// Load user data
	useEffect(() => {
		if (id) {
			dispatch(getUserDetails(id));
			dispatch(getUserPhotos(id));
		}
	}, [dispatch, id]);

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const image = e.target.files[0];

			setImage(image);
		}
	};

	const submitHandle = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const photoData: IPhotoData = {
			title,
			image,
		};

		// Build form data
		const formData = new FormData();

		const photoFormData = Object.keys(photoData).forEach((key) =>
			formData.append(key, photoData[key as keyof IPhotoData]!)
		);

		formData.append("photo", photoFormData!);

		dispatch(publishPhoto(formData));

		setTitle("");

		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.profile}>
			<div className={styles["profile-header"]}>
				{user.profileImage && (
					<img
						src={`${uploads}/users/${user.profileImage}`}
						alt={user.name}
					/>
				)}
				<div className={styles["profile-description"]}>
					<h2>{user.name}</h2>
					<p>{user.bio}</p>
				</div>
			</div>

			{id === userAuth._id && (
				<>
					<div className={styles["new-photo"]} ref={newPhotoForm}>
						<h3>Compartilhe algum momento eu:</h3>

						<form onSubmit={submitHandle}>
							<label>
								<span>Título para a foto:</span>
								<input
									type="text"
									placeholder="Insira um título"
									onChange={(e) => setTitle(e.target.value)}
									value={title}
								/>
							</label>

							<label>
								<span>Imagem:</span>
								<input type="file" onChange={handleFile} />
							</label>

							<SubmitButton action="Postar" />
						</form>
					</div>
				</>
			)}

			<div className={styles["user-photos"]}>
				<h2>Fotos publicadas:</h2>

				<div className={styles["photos-container"]}>
					{photos &&
						photos.map((photo: IPhotoData) => (
							<div className={styles.photo} key={photo._id}>
								{photo.image && (
									<img
										src={`${uploads}/photos/${photo.image}`}
										alt={photo.title}
									/>
								)}
								{id === userAuth._id ? (
									<div className={styles.actions}>
										<Link to={`/photos/${photo._id}`}>
											<BsFillEyeFill />
										</Link>

										<BsPencilFill />
										<BsXLg />
									</div>
								) : (
									<Link
										className="btn"
										to={`/photos/${photo._id}`}
									>
										Ver
									</Link>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Profile;

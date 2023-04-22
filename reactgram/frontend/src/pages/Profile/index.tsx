import styles from "./Profile.module.scss";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

import { uploads } from "../../utils/config";

// Components
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { SubmitButton } from "../../components";

// Hooks
import {
	ChangeEvent,
	FormEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
	deletePhoto,
	getUserPhotos,
	publishPhoto,
	resetMessage,
	updatePhoto,
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

	const [editId, setEditId] = useState("");
	const [editImage, setEditImage] = useState<File>();
	const [editTitle, setEditTitle] = useState("");

	// New form and edit form refs
	const newPhotoForm = useRef<HTMLDivElement>(null);
	const editPhotoForm = useRef<HTMLDivElement>(null);

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

	const resetComponentMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
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

		resetComponentMessage();
	};

	// Delete a photo
	const handleDelete = (id: string) => {
		dispatch(deletePhoto(id));

		resetComponentMessage();
	};

	// Show or hide forms
	const hideOrShowForms = () => {
		newPhotoForm.current!.classList.toggle("hide");
		editPhotoForm.current!.classList.toggle("hide");
	};

	// Update a photo
	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const photoData = {
			title: editTitle,
			id: editId,
		};

		dispatch(updatePhoto(photoData));

		resetComponentMessage();
	};

	const handleEdit = (photo: IPhotoData) => {
		if (editPhotoForm.current!.classList.contains("hide")) {
			hideOrShowForms();
		}

		setEditId(photo._id!);
		setEditTitle(photo.title);
		setEditImage(photo.image);
	};

	const handleCancelEdit = () => {
		hideOrShowForms();
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

					<div
						className={`${styles["edit-photo"]} hide`}
						ref={editPhotoForm}
					>
						<p>Editando:</p>
						{editImage && (
							<img
								src={`${uploads}/photos/${editImage}`}
								alt={editTitle}
							/>
						)}

						<form onSubmit={handleUpdate}>
							<input
								type="text"
								placeholder="Insira um novo título"
								onChange={(e) => setEditTitle(e.target.value)}
								value={editTitle}
							/>

							<SubmitButton action="Atualizar" />
							<button
								className="cancel-btn"
								onClick={handleCancelEdit}
							>
								Cancelar edição
							</button>
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

										<BsPencilFill
											onClick={() => handleEdit(photo)}
										/>
										<BsXLg
											onClick={() =>
												handleDelete(photo._id!)
											}
										/>
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

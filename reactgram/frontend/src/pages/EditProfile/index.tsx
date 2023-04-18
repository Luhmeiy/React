import styles from "./EditProfile.module.scss";
import { uploads } from "../../utils/config";
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// React
import { ChangeEvent, FormEvent } from "react";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import { SubmitButton } from "../../components";

interface IUserData {
	key?: string;
	name: string;
	profileImage?: File;
	bio?: string;
	password?: string;
}

const EditProfile = () => {
	const dispatch: AppDispatch = useDispatch();

	const { user, message } = useSelector(
		(state: initialStateData) => state.user
	);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileImage, setProfileImage] = useState<File>();
	const [bio, setBio] = useState("");
	const [previewImage, setPreviewImage] = useState<File>();

	// Load user data
	useEffect(() => {
		dispatch(profile());
	}, [dispatch]);

	// Fil form with user data
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setBio(user.bio);
		}
	}, [user]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Gather user data from states
		const userData: IUserData = {
			name,
		};

		if (profileImage) {
			userData.profileImage = profileImage;
		}

		if (bio) {
			userData.bio = bio;
		}

		if (password) {
			userData.password = password;
		}

		// Build form data
		const formData = new FormData();

		const userFormData = Object.keys(userData).forEach((key) =>
			formData.append(key, String(userData[key as keyof IUserData]))
		);

		formData.append("user", String(userFormData));

		await dispatch(updateProfile(formData));

		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const image = e.target.files[0];

			setPreviewImage(image);
			setProfileImage(image);
		}
	};

	return (
		<div className={styles["edit-profile"]}>
			<h2>Edite seus dados</h2>
			<p className={styles.subtitle}>
				Adicione uma imagem de perfil e conte mais sobre você...
			</p>

			{(user.profileImage || previewImage) && (
				<img
					src={
						previewImage
							? URL.createObjectURL(previewImage)
							: `${uploads}/users/${user.profileImage}`
					}
					className={styles["profile-image"]}
				/>
			)}

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					disabled
				/>

				<label>
					<span>Imagem do Perfil:</span>
					<input type="file" onChange={handleFile} />
				</label>

				<label>
					<span>Bio:</span>
					<input
						type="text"
						placeholder="Descrição do perfil"
						onChange={(e) => setBio(e.target.value)}
						value={bio}
					/>
				</label>

				<label>
					<span>Quer alterar sua senha?</span>
					<input
						type="password"
						placeholder="Digite sua nova senha"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</label>

				<SubmitButton message={message} action="Atualizar" />
			</form>
		</div>
	);
};

export default EditProfile;

// context / hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

// libraries
import { useNavigate } from "react-router-dom";

// React
import { FormEvent, useState } from "react";

// styles
import styles from "./CreatePost.module.scss";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState("");
	const [formError, setFormError] = useState("");

	const user = useAuthValue()!.user;

	const { insertDocument, response } = useInsertDocument("posts");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormError("");

		insertDocument({
			title,
			image,
			body,
			tags,
			uid: user.uid,
			createdBy: user.displayName,
		});
	};

	return (
		<div className={styles.create_post}>
			<h2>Criar post</h2>
			<p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Título:</span>
					<input
						type="text"
						name="title"
						placeholder="Pense em um bom título..."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>

				<label>
					<span>URL da imagem:</span>
					<input
						type="text"
						name="image"
						placeholder="Insira uma imagem que representa o seu post..."
						value={image}
						onChange={(e) => setImage(e.target.value)}
						required
					/>
				</label>

				<label>
					<span>Conteúdo:</span>
					<textarea
						name="body"
						placeholder="Insite o conteúdo do post"
						value={body}
						onChange={(e) => setBody(e.target.value)}
						required
					></textarea>
				</label>

				<label>
					<span>Tags:</span>
					<input
						type="text"
						name="tags"
						placeholder="Insira as tags separadas por vírgula"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						required
					/>
				</label>

				{!response.loading && (
					<button className="btn">Cadastrar</button>
				)}
				{response.loading && (
					<button className="btn" disabled>
						Aguarde...
					</button>
				)}
				{response.error && <p className="error">{response.error}</p>}
			</form>
		</div>
	);
};

export default CreatePost;

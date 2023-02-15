// components
import { PostDetail } from "../../components";

// hookes
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// libraries
import { Link, useNavigate } from "react-router-dom";

// React
import { FormEvent, useState } from "react";

// styles
import styles from "./Home.module.scss";

const Home = () => {
	const [query, setQuery] = useState("");
	const { documents: posts, loading } = useFetchDocuments("posts");

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<div className={styles.home}>
			<h1>Veja os nossos posts mais recentes</h1>
			<form className={styles.search_form} onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Ou busque por tags..."
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn btn-dark">Pesquisar</button>
			</form>

			<div>
				{loading && <p>Carregando...</p>}
				{posts &&
					posts.map((post) => (
						<PostDetail key={post.id} post={post} />
					))}

				{posts && posts.length === 0 && (
					<div className={styles.no_posts}>
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create" className="btn">
							Criar primeiro post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;

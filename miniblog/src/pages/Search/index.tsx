// components
import { PostDetail } from "../../components";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// libraries
import { Link } from "react-router-dom";

// styles
import styles from "./Search.module.scss";

const Search = () => {
	const query = useQuery();
	const search = query.get("q");

	const { documents: posts } = useFetchDocuments("posts", search);

	return (
		<div className={styles.search_container}>
			<h2>Search</h2>
			<div>
				{posts &&
					posts.map((post) => (
						<PostDetail key={post.id} post={post} />
					))}
				{posts && posts.length == 0 && (
					<div className={styles.no_posts}>
						<p>Sua busca não retornou resultados...</p>
						<Link to="/" className="btn btn-dark">
							Voltar
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;

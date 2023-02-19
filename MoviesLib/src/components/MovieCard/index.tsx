// icons
import { FaStar } from "react-icons/fa";

// interfaces
import { MovieProps } from "../../interfaces/MovieProps";

// libraries
import { Link } from "react-router-dom";

// styles
import styles from "./MovieCard.module.scss";

const imageURL = import.meta.env.VITE_IMG;

interface MovieCardProps {
	movie: MovieProps;
	showLink?: boolean;
}

const MovieCard = ({ movie, showLink = true }: MovieCardProps) => {
	return (
		<div className={styles["movie-card"]}>
			<img src={imageURL + movie.poster_path} alt={movie.title} />
			<h2>{movie.title}</h2>

			<p>
				<FaStar /> {movie.vote_average}
			</p>

			{showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
		</div>
	);
};

export default MovieCard;

// components
import { MovieCard } from "../../components";

// icons
import {
	BsFillFileEarmarkTextFill,
	BsGraphUp,
	BsHourglassSplit,
	BsWallet2,
} from "react-icons/bs";

// interfaces
import { MovieProps } from "../../interfaces/MovieProps";

// libraries
import { useParams } from "react-router-dom";

// React
import { useEffect, useState } from "react";

import styles from "./Movie.module.scss";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

interface ExtendedMovieProps extends MovieProps {
	tagline: string;
	budget: number;
	revenue: number;
	runtime: string;
	overview: string;
}

const Movie = () => {
	const [movie, setMovie] = useState<ExtendedMovieProps | null>(null);

	const { id } = useParams();

	const getMovie = async (url: string) => {
		const res = await fetch(url);
		const data = await res.json();

		setMovie(data);
	};

	const formatCurrency = (number: number) => {
		return number.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	useEffect(() => {
		const movieUrl = `${moviesURL}${id}?${apiKey}`;
		getMovie(movieUrl);
	}, []);

	return (
		<div className={styles["movie-page"]}>
			{movie && (
				<>
					<MovieCard movie={movie} showLink={false} />
					<p className={styles.tagline}>{movie.tagline}</p>

					<div className={styles.info}>
						<h3>
							<BsWallet2 />
							Orçamento:
						</h3>
						<p>{formatCurrency(movie.budget)}</p>
					</div>

					<div className={styles.info}>
						<h3>
							<BsGraphUp />
							Receita:
						</h3>
						<p>{formatCurrency(movie.revenue)}</p>
					</div>

					<div className={styles.info}>
						<h3>
							<BsHourglassSplit />
							Duração:
						</h3>
						<p>{movie.runtime} minutos</p>
					</div>

					<div className={`${styles.info} ${styles.description}`}>
						<h3>
							<BsFillFileEarmarkTextFill />
							Descrição:
						</h3>
						<p>{movie.overview}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Movie;

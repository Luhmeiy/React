// components
import { MovieCard } from "../../components";

// interfaces
import { MovieProps } from "../../interfaces/MovieProps";

// React
import { useEffect, useState } from "react";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
	const [topMovies, setTopMovies] = useState<MovieProps[]>([]);

	const getTopRatedMovies = async (url: string) => {
		const res = await fetch(url);
		const data = await res.json();

		setTopMovies(data.results);
	};

	useEffect(() => {
		const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

		getTopRatedMovies(topRatedUrl);
	}, []);

	return (
		<div className="container">
			<h2 className="title">Melhores filmes</h2>
			<div className="movies-container">
				{topMovies.length === 0 && <p>Carregando...</p>}
				{topMovies.length > 0 &&
					topMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
			</div>
		</div>
	);
};

export default Home;

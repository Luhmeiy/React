// components
import { MovieCard } from "../../components";

// interfaces
import { MovieProps } from "../../interfaces/MovieProps";

// libraries
import { useSearchParams } from "react-router-dom";

// React
import { useEffect, useState } from "react";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
	const [movies, setMovies] = useState<MovieProps[]>([]);

	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");

	const getSearchedMovies = async (url: string) => {
		const res = await fetch(url);
		const data = await res.json();

		setMovies(data.results);
	};

	useEffect(() => {
		const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`;

		getSearchedMovies(searchWithQueryUrl);
	}, [query]);

	return (
		<div className="container">
			<h2 className="title">
				Resultados para: <span className="query-text">{query}</span>
			</h2>
			<div className="movies-container">
				{movies.length === 0 && <p>Carregando...</p>}
				{movies.length > 0 &&
					movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
			</div>
		</div>
	);
};

export default Search;

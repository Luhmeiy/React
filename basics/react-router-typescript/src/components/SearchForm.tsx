// libraries
import { useNavigate } from "react-router-dom";

// React
import { FormEvent, useState } from "react";

const SearchForm = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		navigate(`/search?q=${query}`);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" onChange={(e) => {
				const target = e.target as HTMLInputElement;
				setQuery(target.value);
			}} />
			<input type="submit" value="Buscar" />
		</form>
	)
}

export default SearchForm;
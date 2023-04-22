// React
import { useState, useEffect } from 'react';

interface Items {
	id: number,
	name: string,
	price: number
}

export const useFetch = (url: string) => {
	const [data, setData] = useState<Items[]>([]);

	// POST
	const [config, setConfig] = useState<Object | null>(null);
	const [method, setMethod] = useState<string | null>(null);
	const [callFetch, setCallFetch] = useState<Items | boolean>(false);

	// LOADING
	const [loading, setLoading] = useState<boolean>(false);

	// ERRORS
	const [error, setError] = useState<string | null>(null);

	// ITEM ID
	const [itemId, setItemId] = useState<number | null>(null);

	const httpConfig = (item: Object, method: string) => {
		if (method === "POST") {
			setConfig({
				method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(item)
			});

			setMethod(method);
		}
		else if (method === "DELETE") {
			let value = Object.values(item)[0];

			setConfig({
				method,
				headers: {
					"Content-Type": "application/json"
				}
			});

			setMethod(method);
			setItemId(value);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const res: Response = await fetch(url);
				const json: Items[] = await res.json();

				setData(json);
			} catch (err) {
				if (typeof err === "string") {
					console.log(err.toUpperCase());
				} else if (err instanceof Error) {
					console.log(err.message);
				}
				
				setError("There was an error loading the data!");
			}
	 
			setLoading(false);
		}

		fetchData();
	}, [url, callFetch]);

	useEffect(() => {
		const httpRequest = async () => {
			let json: Items;

			if (method === "POST") {
				let fetchOptions: [string, Object] = [url, config!];
	
				const res: Response = await fetch(...fetchOptions);
				json = await res.json();
			}
			else if (method === "DELETE") {
				const deleteUrl = `${url}/${itemId}`;

				const res: Response = await fetch(deleteUrl, config!)
				json = await res.json();
			}

			setCallFetch(json!);
		}

		httpRequest();
	}, [config, method, url, itemId]);

	return { data, httpConfig, loading, error };
}
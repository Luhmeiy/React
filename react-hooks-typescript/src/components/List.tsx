import { useState, useEffect } from "react";

const List = ({ getItems }: { getItems: () => string[] }) => {
	const [myItems, setMyItems] = useState<string[]>([]);

	useEffect(() => {
		console.log("Searching items from DB...");

		setMyItems(getItems);
	}, [getItems]);

	return (
		<div>{myItems && myItems.map((item) => <p key={item}>{item}</p>)}</div>
	);
};

export default List;

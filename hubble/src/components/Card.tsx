import { StyledCard } from "./styles/Card.styled";

type CardProps = {
	id: number;
	title: string;
	body: string;
	image: string;
};

export const Card = ({ id, title, body, image }: CardProps) => {
	return (
		<StyledCard layout={id % 2 === 0 ? "row-reverse" : "row"}>
			<div>
				<h2>{title}</h2>
				<p>{body}</p>
			</div>

			<div>
				<img src={`./images/${image}`} alt="" />
			</div>
		</StyledCard>
	);
};

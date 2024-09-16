import styled from "styled-components";

export const Button = styled.button<{ bg?: string }>`
	background-color: ${({ bg }) => bg || "#fff"};
	color: ${({ color }) => color || "#333"};
	border: none;
	border-radius: 50px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	cursor: pointer;
	font-size: 16px;
	font-weight: 700;
	padding: 15px 60px;

	&:hover {
		opacity: 0.9;
		transform: scale(0.98);
	}
`;

import styled from "styled-components";

export const StyledCard = styled.div<{ layout: string }>`
	align-items: center;
	background-color: #fff;
	border-radius: 15px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: ${({ layout }) => layout};
	margin: 40px 0;
	padding: 60px;

	img {
		width: 80%;
	}

	& > div {
		flex: 1;
	}

	& div:nth-child(2) {
		display: flex;
		flex-direction: ${({ layout }) =>
			layout === "row" ? "row-reverse" : "row"};
	}

	@media (max-width: ${({ theme }) => theme.mobile}) {
		flex-direction: column;
	}
`;

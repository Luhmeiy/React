import styled from "styled-components";

export const Flex = styled.div`
	align-items: center;
	display: flex;

	& > div,
	& > ul {
		flex: 1;
	}

	@media (max-width: ${({ theme }) => theme.mobile}) {
		flex-direction: column;
		text-align: center;
	}
`;

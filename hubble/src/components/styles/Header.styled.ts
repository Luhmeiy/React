import styled from "styled-components";

export const StyledHeader = styled.header`
	background-color: ${({ theme }) => theme.colors.header};
	padding: 40px 0;
`;

export const Nav = styled.nav`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;

	@media (max-width: ${({ theme }) => theme.mobile}) {
		flex-direction: column;
	}
`;

export const Logo = styled.img`
	@media (max-width: ${({ theme }) => theme.mobile}) {
		margin-bottom: 40px;
	}
`;

export const Image = styled.img`
	margin-left: 40px;
	width: 375px;

	@media (max-width: ${({ theme }) => theme.mobile}) {
		margin: 40px 0 30px;
	}
`;

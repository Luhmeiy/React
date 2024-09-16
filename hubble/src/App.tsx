import { ThemeProvider } from "styled-components";
import { content } from "./content";
import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const theme = {
	colors: {
		header: "#ebfbff",
		body: "#fff",
		footer: "#003333",
	},
	mobile: "768px",
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Header />
			<Container>
				{content.map((item, index) => (
					<Card {...item} key={index} />
				))}
			</Container>
			<Footer />
		</ThemeProvider>
	);
}

export default App;

import styles from './StartScreen.module.scss';

interface Props {
	startGame(): void;
}

const StartScreen = ({ startGame }: Props) => {
	return (
		<div className={styles['start-screen']}>
			<h1 className={styles['start-screen__title']}>Secret Word</h1>
			<p className={styles['start-screen__text']}>Click the button below to start playing</p>
			<button className="btn" onClick={startGame}>Start game</button>
		</div>
	)
}

export default StartScreen;
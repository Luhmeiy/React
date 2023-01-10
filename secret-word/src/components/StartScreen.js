import startScreen from './StartScreen.module.scss';

const StartScreen = ({ startGame }) => {
    return (
        <div className={startScreen['start-screen']}>
            <h1 className={startScreen['start-screen__title']}>Secret Word</h1>
            <p className={startScreen['start-screen__text']}>Click the button below to start playing</p>
            <button className="btn" onClick={startGame}>Start game</button>
        </div>
    )
}

export default StartScreen;
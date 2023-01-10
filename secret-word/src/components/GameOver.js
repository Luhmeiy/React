import gameOver from './GameOver.module.scss';

const GameOver = ({ retry, score }) => {
    return (
        <div className={gameOver['game-over']}>
            <h1>Game Over!</h1>
            <h2>Points: <span>{score}</span></h2>
            <button className="btn" onClick={retry}>Reset game</button>
        </div>
    )
}

export default GameOver;
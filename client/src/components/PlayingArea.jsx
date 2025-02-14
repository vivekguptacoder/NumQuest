import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types';

export default function PlayingArea({onGameEnd}) {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 50) + 1)
    const [guess, setGuess] = useState('')
    const [feedback, setFeedback] = useState('')
    const [chancesLeft, setChancesLeft] = useState(5)
    const [previousGuesses, setPreviousGuesses] = useState([]) 
    const [gameOver, setGameOver] = useState(false)

    const sendGameResult = async (result) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://numquest.onrender.com/game/${result}`, 
                { result }, 
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            onGameEnd()
        } catch (err) {
            console.error('Failed to send game result:', err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userGuess = parseInt(guess)
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
            setFeedback('Please enter a number between 1 and 50!')
            return
        }

        if (previousGuesses.includes(userGuess)) {
            setFeedback('You already guessed that number!')
            return
        }

        setPreviousGuesses([...previousGuesses, userGuess])

        if (userGuess === randomNumber) {
            setFeedback('Congratulations! You guessed the right number!')
            setGameOver(true)
            sendGameResult('won')
            return
        }

        if (userGuess > randomNumber) {
            setFeedback('Too high, try again!')
        } else {
            setFeedback('Too low, try again!')
        }
        setGuess('')
        setChancesLeft(chancesLeft - 1)

        if (chancesLeft - 1 === 0) {
            setFeedback(`Game over! The correct number was ${randomNumber}`)
            setGameOver(true)
            sendGameResult('lost')

        }
    }

    const handleReset = () => {
        setRandomNumber(Math.floor(Math.random() * 50) + 1)
        setGuess('')
        setFeedback('')
        setChancesLeft(5)
        setPreviousGuesses([])
        setGameOver(false)
    }

    return (
        <>
            <div className="bg-gradient-to-b from-[#124E66] w-screen lg:w-3/5 h-screen lg:h-full md:rounded-full p-4 text-center flex flex-col justify-around items-center">
                <p className="text-3xl font-bold  ">Guess the number <br /> between 1 to 50</p>
                <p className="text-lg font-semibold   ">You have {chancesLeft} chances left</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
                    <input
                        type="number"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        className="border-[#208cbc] w-1/4 h-24 text-5xl text-[#208cbc] font-extrabold tracking-wider text-center border-2 rounded-md    outline-none"
                        placeholder="?"
                        disabled={gameOver}
                    />
                    {chancesLeft === 0 || feedback === 'Congratulations! You guessed the right number!' ? 
                    (
                    <button onClick={handleReset} className="w-fit px-4 py-2 rounded-lg font-bold border-2 border-[#208cbc]">
                        Play Again
                    </button>
                    ) : 
                    <button disabled={gameOver} className="px-4 py-1 rounded-lg font-bold border-2 border-[#208cbc]">Submit</button>
                }
                    
                </form>
                {previousGuesses.length > 0 && 
                <div className="w-3/5 mx-auto flex items-center space-x-4">
                    <p className="text-left text-xl font-semibold">Previous Guesses</p>
                    <p className="tracking-wider text-lg font-semibold">{previousGuesses.join(' ') || '-'}</p>
                </div>}
                <p className=" text-4xl w-full md:3/4 lg:w-2/4 mx-auto font-bold">{feedback}</p>
            </div>
        </>
    )
}

PlayingArea.propTypes = {
    onGameEnd: PropTypes.func.isRequired, 
};
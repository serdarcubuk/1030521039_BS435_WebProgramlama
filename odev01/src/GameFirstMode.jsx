import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameFirstMode.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameFirstMode = () => {
    const [minRangeInput, setMinRangeInput] = useState('');
    const [maxRangeInput, setMaxRangeInput] = useState('');
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(100);
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(minRange, maxRange));
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (isGameStarted) {
            setFeedback('');
            setTargetNumber(generateRandomNumber(minRange, maxRange));
            setAttempts(0);
            setIsGameOver(false);
        }
    }, [minRange, maxRange, isGameStarted]);


    const handleGuess = () => {
        const guess = parseInt(userGuess);

        if (!isGameStarted) {
            setFeedback('You cannot make a guess before the game starts');
        } else if (isNaN(guess) || guess < minRange || guess > maxRange) {
            setFeedback('Enter a valid number');
        } else {
            setAttempts(attempts + 1);

            if (guess === targetNumber) {
                setFeedback(`Congrats! Answer was ${targetNumber}. Do you want to play again?`);
                setIsGameOver(true);
            } else if (attempts === 9) {
                setFeedback(`Sorry, You have used up your 10 guessing attempts. Correct answer was ${targetNumber}. Do you want to play again?`);
                setIsGameOver(true);
            } else {
                setFeedback(guess < targetNumber ? 'Try a higher number' : 'Try a lower number');
            }
        }
    };

    const startGame = () => {
        const parsedMinRange = parseInt(minRangeInput);
        const parsedMaxRange = parseInt(maxRangeInput);

        if (isNaN(parsedMinRange) || isNaN(parsedMaxRange) || parsedMinRange >= parsedMaxRange) {
            setFeedback('Error: Enter valid Min and Max values before starting the game. Min should be less than Max.');
            return;
        }

        setIsGameStarted(true);
        setMinRange(parsedMinRange || 1);
        setMaxRange(parsedMaxRange || 100);
        setFeedback('');
    };




    const resetGame = () => {
        setIsGameStarted(false);
        setFeedback('');
        setUserGuess('');
        setMinRangeInput('');
        setMaxRangeInput('');
        setIsGameOver(false);
    };

    return (
        <div>
            <h1>Guess The Number</h1>
            {isGameStarted ? (
                <>
                    <p>{`The target number range: ${minRange} - ${maxRange}`}</p>
                    <p>{`Guess attempts: ${10 - attempts }`}</p>
                    <p>{feedback}</p>
                    <input
                        type="text"
                        placeholder="Enter your number guess"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                    />
                    <Button onClick={handleGuess} disabled={isGameOver || attempts === 10}>Guess</Button>
                </>
            ) : (
                <>
                    <p>Set the target number range before starting the game.</p>
                    <p>{feedback}</p>
                    <label>Min Range: <input type="text" value={minRangeInput} onChange={(e) => setMinRangeInput(e.target.value)} /></label>
                    <label>Max Range: <input type="text" value={maxRangeInput} onChange={(e) => setMaxRangeInput(e.target.value)} /></label>
                    <Button onClick={startGame}>Start</Button>
                </>
            )}
            {(feedback.includes('Correct Answer!') || feedback.includes('Do you want to play again?')) && (
                <Link to="/">
                    <Button onClick={resetGame}>Go Back</Button>
                </Link>
            )}
        </div>
    );
};

export default GameFirstMode;

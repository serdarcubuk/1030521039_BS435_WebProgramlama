import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GameSecondMode.css';

const GameSecondMode = () => {
    const [minRangeInput, setMinRangeInput] = useState('');
    const [maxRangeInput, setMaxRangeInput] = useState('');
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(100);
    const [computerGuess, setComputerGuess] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isCorrectGuess, setIsCorrectGuess] = useState(false);

    useEffect(() => {
        generateComputerGuess();
    }, [isGameStarted, minRange, maxRange]);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateComputerGuess = () => {
        setComputerGuess(generateRandomNumber(minRange, maxRange));
    };

    const startGame = () => {
        const parsedMinRange = parseInt(minRangeInput);
        const parsedMaxRange = parseInt(maxRangeInput);

        if (isNaN(parsedMinRange) || isNaN(parsedMaxRange) || parsedMinRange >= parsedMaxRange) {
            setFeedback('Error: Enter valid Min and Max values before starting the game. Min should be less than Max.');
            return;
        }

        setMinRange(parsedMinRange || 1);
        setMaxRange(parsedMaxRange || 100);
        setFeedback('');
        setAttempts(0);
        setIsGameOver(false);
        setIsGameStarted(true);
        setIsCorrectGuess(false);
    };

    const handleCorrectGuess = () => {
        setFeedback(`Congrats! Computers guess was ${computerGuess}. Do you want to play again?`);
        setIsGameOver(true);
        setIsCorrectGuess(true);
    };

    const handleIncorrectGuess = (isGreater) => {
        if (isGreater) {
            setFeedback(`The computers previous guess ${computerGuess}.`);
            setMinRange(Math.min(computerGuess + 1, maxRange));
        } else {
            setFeedback(`The computers previous guess ${computerGuess}.`);
            setMaxRange(Math.max(computerGuess - 1, minRange));
        }

        setAttempts(attempts + 1);

        if (attempts === 9) {
            setFeedback(`Sorry, You have used up your 10 guessing attempts. Do you want to play again?`);
            setIsGameOver(true);
            setIsCorrectGuess(true);
        } else {
            generateComputerGuess();
        }
    };

    const resetGame = () => {
        setMinRangeInput('');
        setMaxRangeInput('');
        setIsGameStarted(false);
        setFeedback('');
        setIsGameOver(false);
    };

    return (
        <div>
            <h1>Computer Guesses Your Number</h1>
            {isGameStarted ? (
                <>
                    <p>{`The target number range: ${minRange} - ${maxRange}`}</p>
                    <p>{`Guess attempts: ${10 - attempts}`}</p>
                    <p>{feedback}</p>
                    <input
                        type="text"
                        placeholder="Enter your number guess"
                        value={computerGuess}
                        readOnly
                    />
                    <Button onClick={handleCorrectGuess} className="mx-1" disabled={isCorrectGuess || isGameOver}>Doğru</Button>
                    <Button onClick={() => handleIncorrectGuess(true)} className="mx-1" disabled={isCorrectGuess || isGameOver}>Higher</Button>
                    <Button onClick={() => handleIncorrectGuess(false)} className="mx-1" disabled={isCorrectGuess || isGameOver}>Lower</Button>
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
            {(feedback.includes(`Congrats! Computers guess was ${computerGuess}. Do you want to play again?`) || feedback.includes('Sorry, You have used up your 10 guessing attempts')) && (
                <Link to="/">
                    <Button onClick={resetGame} className="mx-1" disabled={!isCorrectGuess && !isGameOver}>Go Back</Button>
                </Link>
            )}
        </div>
    );
};

export default GameSecondMode;
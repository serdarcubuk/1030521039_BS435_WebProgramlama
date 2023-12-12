import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameFirstMode.css';

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
            setFeedback('Oyun başlamadan tahmin yapamazsınız.');
        } else if (isNaN(guess) || guess < minRange || guess > maxRange) {
            setFeedback('Geçerli bir sayı girin.');
        } else {
            setAttempts(attempts + 1);

            if (guess === targetNumber) {
                setFeedback(`Tebrikler! Doğru cevap ${targetNumber}. Doğru bildiniz.`);
                setIsGameOver(true);
            } else if (attempts === 9) {
                setFeedback(`Üzgünüm, 10 tahmin hakkınız doldu. Doğru cevap ${targetNumber} idi. Yeniden oynamak ister misiniz?`);
                setIsGameOver(true);
            } else {
                setFeedback(guess < targetNumber ? 'Daha yüksek bir sayı deneyin.' : 'Daha düşük bir sayı deneyin.');
            }
        }
    };

    const startGame = () => {
        const parsedMinRange = parseInt(minRangeInput);
        const parsedMaxRange = parseInt(maxRangeInput);

        if (isNaN(parsedMinRange) || isNaN(parsedMaxRange) || parsedMinRange >= parsedMaxRange) {
            setFeedback('Hata: Oyuna başlamadan önce geçerli bir "Min" ve "Max" değeri girin. Min, Max\'den küçük olmalıdır.');
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
            <h1>Sayı Tahmin Oyunu</h1>
            {isGameStarted ? (
                <>
                    <p>{`Hedef sayı aralığı: ${minRange} - ${maxRange}`}</p>
                    <p>{`Tahmin hakkınız: ${10 - attempts }`}</p>
                    <p>{feedback}</p>
                    <input
                        type="text"
                        placeholder="Sayı tahmini girin"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                    />
                    <button onClick={handleGuess} disabled={isGameOver || attempts === 10}>Tahmin Et</button>
                </>
            ) : (
                <>
                    <p>Oyun başlamadan önce hedef sayı aralığını belirleyin.</p>
                    <p>{feedback}</p>
                    <label>Min Range: <input type="text" value={minRangeInput} onChange={(e) => setMinRangeInput(e.target.value)} /></label>
                    <label>Max Range: <input type="text" value={maxRangeInput} onChange={(e) => setMaxRangeInput(e.target.value)} /></label>
                    <button onClick={startGame}>Oyunu Başlat</button>
                </>
            )}
            {(feedback.includes('Doğru bildiniz') || feedback.includes('Yeniden oynamak ister misiniz')) && (
                <Link to="/">
                    <button onClick={resetGame}>Başa Dön</button>
                </Link>
            )}
        </div>
    );
};

export default GameFirstMode;

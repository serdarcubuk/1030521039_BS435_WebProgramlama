import React, { useState, useEffect } from 'react';

const App = () => {
    const [minRange, setMinRange] = useState(1); // Minimum sayı aralığını depolamak için state
    const [maxRange, setMaxRange] = useState(100); // Maximum sayı aralığını depolamak için state
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(minRange, maxRange)); // Hedef sayıyı depolamak için state
    const [userGuess, setUserGuess] = useState(''); // Kullanıcının tahminini depolamak için state
    const [feedback, setFeedback] = useState(''); // Kullanıcıya geri bildirimde bulunmak için state

    // Yeni bir hedef sayı üreten fonksiyon
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Sayfa yüklendiğinde ve hedef sayı değiştiğinde feedback'i sıfırla
    useEffect(() => {
        setFeedback('');
    }, [targetNumber]);

    // Kullanıcının tahminini kontrol eden fonksiyon
    const handleGuess = () => {
        const guess = parseInt(userGuess);

        if (isNaN(guess) || guess < minRange || guess > maxRange) {
            setFeedback('Geçerli bir sayı girin.');
        } else if (guess === targetNumber) {
            setFeedback(`Tebrikler! ${targetNumber}'ı doğru tahmin ettiniz.`);
        } else {
            setFeedback(guess < targetNumber ? 'Daha yüksek bir sayı deneyin.' : 'Daha düşük bir sayı deneyin.');
        }
    };

    return (
        <div>
            <h1>Sayı Tahmin Oyunu</h1>
            <p>{`Hedef sayı aralığı: ${minRange} - ${maxRange}`}</p>
            <p>{feedback}</p>
            <input
                type="text"
                placeholder="Sayı tahmini girin"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
            />
            <button onClick={handleGuess}>Tahmin Et</button>
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GameModeSelector.css';



const GameModeSelector = () => {
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <div id={"res"}>
            <div>
                <h1>Game App</h1>

            <h2>Select Game Mode</h2>
            <Link to="/mode1">
                <button onClick={() => handleModeSelect('MODE1')}>Mode1</button>
            </Link>
            <Link to="/mode2">
                <button onClick={() => handleModeSelect('MODE2')}>Mode2</button>
            </Link>

            {selectedMode && (
                <p>You have selected {selectedMode} mode.</p>
            )}
        </div>

        </div>
    );
};

export default GameModeSelector;

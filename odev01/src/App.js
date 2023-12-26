import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModeSelector from './GameModeSelector';
import './App.css';
import GameFirstMode from "./GameFirstMode";
import GameSecondMode from "./GameSecondMode";


const Home = () => {
    return (
        <div>
            <GameModeSelector />
        </div>
    );
};

const Mode1 = () => {
    return (
        <div>
            <h2>Mode 1</h2>
            <GameFirstMode />
        </div>
    );
};

const Mode2 = () => {
    return (
        <div>
            <h2>Mode 2</h2>
            <GameSecondMode />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MODE1" element={<Mode1 />} />
                <Route path="/MODE2" element={<Mode2 />} />
            </Routes>
        </Router>
    );
};

export default App;
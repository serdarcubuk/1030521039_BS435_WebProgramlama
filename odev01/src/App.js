import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModeSelector from './GameModeSelector';
import './App.css';

const Home = () => {
    return (
        <div>

            <GameModeSelector />
        </div>
    );
};

const Mode1 = () => {
    return <div>Content for Mode1</div>;
};

const Mode2 = () => {
    return <div>Content for Mode2</div>;
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
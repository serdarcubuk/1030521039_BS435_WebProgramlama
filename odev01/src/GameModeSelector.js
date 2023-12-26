import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GameModeSelector.css';

const GameModeSelector = () => {
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Welcome To The Guess The Number Game</h1>
                    <h2>Select The Game Mode</h2>
                    <Link to="/mode1">
                        <Button variant="danger" onClick={() => handleModeSelect('MODE1')}>
                            Mode1
                        </Button>
                    </Link>
                    <Link to="/mode2">
                        <Button variant="success" onClick={() => handleModeSelect('MODE2')}>
                            Mode2
                        </Button>
                    </Link>
                    {selectedMode && <p>You have selected {selectedMode} mode.</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default GameModeSelector;

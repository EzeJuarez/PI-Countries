import './styles/LandingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="container-landingPage">
            <h1 className="title">Go to travel</h1>
            <Link to="/home">
                <button className="button">Home</button>
            </Link>
        </div>
    );
};

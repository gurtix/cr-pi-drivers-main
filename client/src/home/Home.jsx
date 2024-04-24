import "./Home.css";
import Cards from "../components/cards/cards"
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useHistory, Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <header>
                <nav>
                    <button onClick={() => history.push('/create')}>Crear Corredor</button>
                </nav>
            </header>
            <Cards />
        </div>
    )
}
export default Home;
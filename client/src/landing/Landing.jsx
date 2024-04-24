import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
// import backgroundImage from './driver.png';
import backgroundVideo from './driver.mp4';


function Landing() {
  return(
    <div className="landing-root">
    <div className="landing-page">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="cuadro-dialogo">
        <div className='texto'>
        <h1>BIENVENIDO</h1>
        <h1>A</h1>
        <h1>PI-DRIVERS</h1>

        </div>
        <div className='botones'>
        <Link to="/home">
          <button>ENTRAR</button>
        </Link>
        </div>
      </div>
    </div>
    </div>
)}

export default Landing;
import "./card.css"
import { Link } from 'react-router-dom';
import backgroundImage from './card.jpg';

function Card ({driver: {id, name, teams, image, dob}}){
    return(
        <Link to={`/home/${id}`}>
            <div className="backgroundCard" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-container">
            <img src={image} alt={`${name.forename} ${name.surname}`} />
            <h2>{name ? `${name.forename} ${name.surname}` : ''}</h2>
            <p className="dob">Fecha de Nacimiento: {new Date(dob).toLocaleDateString()}</p>
            <p>Escuderías: {teams ? teams.split(',').join(', ') : ''}</p>
        </div>
            </div>
        </Link>
    )
}

export default Card;
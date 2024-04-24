import "./card.css"
import { Link } from 'react-router-dom';

function Card ({driver: {id, name, teams, image}}){
    return(
        <Link to={`/home/${id}`}>
        <div className="card-container">
            <img src={image} alt={`${name.forename} ${name.surname}`} />
            <h2>{name ? `${name.forename} ${name.surname}` : ''}</h2>
            <p>Equipos: {teams ? teams.split(',').join(', ') : ''}</p>
        </div>
        </Link>
    )
}

export default Card;
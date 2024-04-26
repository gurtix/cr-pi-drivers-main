import "./detail.css";
import React, { useEffect, useState} from 'react';
import { useParams, Link  } from 'react-router-dom';

function Detail (){
    const { id } = useParams();
    const numericId = Number(id);
    const [driver, setDriver] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [driverIds, setDriverIds] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/Drivers/${id}`)
            .then(response => response.json())
            .then(data => setDriver(data));

            fetch('http://localhost:3001/Drivers')
    .then(response => response.json())
    .then(data => setDriverIds(data.map(driver => Number(driver.id))));
    }, [id]);
    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    if (!driver) {
        return <div>Loading...</div>;
    }
    const currentIndex = driverIds.indexOf(numericId);
    const prevId = driverIds[currentIndex - 1];
    const nextId = driverIds[currentIndex + 1];

    return (
        <div className="detail">
            <header className={`header ${isScrolled ? 'hidden' : ''}`}>
                <div>
                <Link to="/home" className="boton">
                <button >INICIO</button>
                </Link>
                </div>
                <div>
                {prevId && <Link to={`/home/${prevId}`}><button>Corredor Anterior</button></Link>}
                {nextId && <Link to={`/home/${nextId}`}><button>Siguiente Corredor</button></Link>}
                </div>
            </header>
            <div className="image">
                <table className="img-name">
                    <tr></tr>
            <img src={driver.image} alt={`${driver.name.forename} ${driver.name.surname}`} />
                        <th></th>
            <tr className="name">
                <td>
                <th>
            {driver.name.forename} {driver.name.surname}
                </th>
                </td>
            </tr>
                </table>            
            <table className="nationality">
            <tr>
            <td>
                <th>Nacionalidad:</th>
                </td>
                <td className="td-n">{driver.nationality}</td>
            </tr>
            <tr>
            <td>
                <th>Fecha de Nacimiento:</th>
                </td>
                <td>{new Date(driver.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
            <td>
                <th>Escudeíras:</th>
                </td>
                <td>{driver.teams}</td>
            </tr>
            </table>
            </div>
            <div className="info-container">      
                <table className="description">
            <tr className="description-td">
            <td>
                <th>Descripción:</th>
                </td>
                <td >{driver.description}</td>
            </tr>

            </table>
            
            </div>
        </div>
    );
}
export default Detail;
import "./Create.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Create() {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [teams, setTeams] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!forename || !surname || !description || !image || !nationality || !dob || !teams) {
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }
        const driverData = {
            name: { forename, surname },
            description,
            image: { url: image },
            nationality,
            dob,
            teams
        };
        try {
            const response = await axios.post('http://localhost:3001/Drivers', driverData);
            console.log(response.data);
            setSuccessMessage('CREACIÓN EXITOSA');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('ERROR AL CREAR CORREDOR');
        }
    };

    return (
        <div className="create">
            <header className={`header ${isScrolled ? 'hidden' : ''}`}>
                <Link to="/home" className="boton">
                    <button >INICIO</button>
                </Link>
            </header>
            <div className="separador"></div>
            <div className="tittle">
                <h3>CREAR CORREDOR</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Nombre:</h2>
                    <input type="text" value={forename} onChange={(e) => setForename(e.target.value)} className="data" />
                </label>
                <label>
                    <h2>Apellido:</h2>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} className="data" />
                </label>
                <label>
                    <h2>Fecha de nacimiento:</h2>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="dob-input" />
                </label>
                <label>
                    <h2>Imagen:</h2>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="data" />
                    {image && <img src={image} alt="Vista previa" style={{ width: '100px', height: '100px' }} />}
                </label>
                <label>
                    <h2>Nacionalidad:</h2>
                    <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} className="data" />
                </label>
                <label>
                    <h2>Escuderías:</h2>
                    <input type="text" value={teams} onChange={(e) => setTeams(e.target.value)} className="data" />
                </label>
                <label>
                    <h2>Descripción:</h2>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="description-input" />
                </label>
                <input type="submit" value="Crear Corredor" className="boton-crear" />
                <div className="error-message">
                    {successMessage && <p className='mensajeCreado'>{successMessage}</p>}
                    {errorMessage && <p className='mensajeError'>{errorMessage}</p>}
                </div>
            </form>
            <div className="bottom"></div>

        </div>
    )
}
export default Create;
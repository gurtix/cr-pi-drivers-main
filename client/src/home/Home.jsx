import "./Home.css";
import Cards from "../components/cards/cards"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teams, setTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCreated, setShowCreated] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/Drivers/teams')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTeams(data);
                } else {
                    console.error('La respuesta no es un array de cadenas:', data);
                }
            });
    }, []);

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
    


    return (
        <div className="home">
            <header className={`header ${isScrolled ? 'hidden' : ''}`}>
                <Link to={"/create"}>
                    <button >Crear Corredor</button>
                </Link>
                    <input type="text" placeholder="Buscar por nombre..." onChange={e => setSearchTerm(e.target.value)} />
            </header>
            <div className="filter-button">
                <button onClick={() => setIsModalOpen(true)}>
                    ☰
                </button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="filter">
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="">Ordenar por...</option>
                                <option value="name-asc">Nombre (A-Z)</option>
                                <option value="name-desc">Nombre (Z-A)</option>
                                <option value="surname-asc">Apellido (A-Z)</option>
                                <option value="surname-desc">Apellido (Z-A)</option>
                                <option value="dob">Fecha de nacimiento</option>
                            </select>
                            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                                <option value="">Todas las escuderías</option>
                                {teams.map((team, index) => (
                                    <option key={index} value={team.teams}>{team.teams}</option>
                                ))}
                            </select>
                            <select value={showCreated} onChange={(e) => setShowCreated(e.target.value === 'true')}>
                                <option value="">Todos los Corredores</option>
                                <option value="true">Corredores creados</option>
                            </select>
                            <button onClick={() => setIsModalOpen(false)}>
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Cards sortOrder={sortOrder} selectedTeam={selectedTeam} showCreated={showCreated} searchTerm={searchTerm}/>
        </div>
    )
}
export default Home;